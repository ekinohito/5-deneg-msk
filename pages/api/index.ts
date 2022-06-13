import { ApolloServer } from "apollo-server-micro"
import { DateTimeResolver } from "graphql-scalars"
import { NextApiHandler } from "next"
import {
    asNexusMethod,
    makeSchema,
    nonNull,
    objectType,
    stringArg,
    intArg,
    list,
} from "nexus"
import path, { resolve } from "path"
import cors from "micro-cors"
import prisma from "../../lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { data } from "autoprefixer"

export const GQLDate = asNexusMethod(DateTimeResolver, "date")

const SALT_ROUNDS = 12

const User = objectType({
    name: "User",
    definition(t) {
        t.int("id")
        t.string("email")
        t.string("name")
    },
})

const Volunteer = objectType({
    name: "Volunteer",
    definition(t) {
        t.int("id")
        t.string("picture")
        t.field("user", {
            type: "User",
        })
        t.float("rating")
        t.int("eventsCount")
        t.string("shortDescription")
        t.string("skills")
        t.string("langs")
        t.string("interests")
        t.string("fullDescription")
        t.date("dateOfBirth")
    },
})

const Query = objectType({
    name: "Query",
    definition(t) {
        t.field("user", {
            type: "User",
            args: {
                userId: intArg(),
                email: stringArg(),
            },
            resolve: (_, { userId, email }) => {
                return prisma.user.findUnique({
                    where: {
                        id: userId ?? undefined,
                        email: email ?? undefined,
                    },
                })
            },
        })
        t.field("login", {
            type: "String",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (_, { email, password }) => {
                try {
                    const user = await prisma.user.findUnique({
                        where: { email },
                    })
                    if (!(await bcrypt.compare(password, user.hashedPassword)))
                        return null
                    return jwt.sign(user, "secret")
                } catch {
                    return null
                }
            },
        })
        t.field("volunteer", {
            type: "Volunteer",
            args: {
                id: nonNull(intArg()),
            },
            resolve: async (_, { id }) => {
                return prisma.volunteer.findUnique({
                    where: { id },
                    include: { user: true },
                })
            },
        })
        t.field("volunteer2", {
            type: "Volunteer",
            args: {
                id: nonNull(intArg()),
            },
            resolve: async (_, { id }) => {
                return prisma.volunteer.findUnique({
                    where: { userId: id },
                    include: { user: true },
                })
            },
        })
        t.field("volunteers", {
            type: list("Volunteer"),
            resolve: async () => {
                return prisma.volunteer.findMany({ include: { user: true } })
            },
        })
    },
})

const Mutation = objectType({
    name: "Mutation",
    definition(t) {
        t.field("signupUser", {
            type: "User",
            args: {
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (_, { name, email, password }, ctx) => {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
                return prisma.user.create({
                    data: {
                        name,
                        email,
                        hashedPassword,
                    },
                })
            },
        })
        t.field("upsertVolunteer", {
            type: "Volunteer",
            args: {
                id: nonNull(intArg()),
                shortDescription: stringArg(),
                picture: stringArg(),
                skills: nonNull(stringArg()),
                langs: nonNull(stringArg()),
                interests: nonNull(stringArg()),
                fullDescription: nonNull(stringArg()),
                dateOfBirth: stringArg()
            },
            resolve: async (_, {id, ...volunteer}) => {
                return prisma.volunteer.upsert({
                    where: {userId: id},
                    update: volunteer,
                    create: { ...volunteer, userId: id },
                    include: { user: true }
                })
            }
        })
        t.field("alterRating", {
            type: "Float",
            args: {
                id: nonNull(intArg()),
                rating: nonNull(intArg()),
            },
            resolve: async (_, { id, rating }) => {
                return await prisma.$transaction(async prisma => {
                    const user = await prisma.volunteer.findUnique({
                        where: { id },
                    })
                    await prisma.volunteer.update({
                        where: { id },
                        data: {
                            rating: user.rating + rating,
                            eventsCount: user.eventsCount + 1,
                        },
                    })
                    return (user.rating + rating) / (user.eventsCount + 1)
                })
            },
        })
    },
})

export const schema = makeSchema({
    types: [Query, Mutation, User, Volunteer, GQLDate],
    outputs: {
        typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
        schema: path.join(process.cwd(), "generated/schema.graphql"),
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler() {
    const apolloServer = new ApolloServer({ schema })

    if (!apolloServerHandler) {
        await apolloServer.start()

        apolloServerHandler = apolloServer.createHandler({
            path: "/api",
        })
    }

    return apolloServerHandler
}

const handler: NextApiHandler = async (req, res) => {
    const apolloServerHandler = await getApolloServerHandler()

    if (req.method === "OPTIONS") {
        res.end()
        return
    }

    return apolloServerHandler(req, res)
}

export default cors()(handler)
