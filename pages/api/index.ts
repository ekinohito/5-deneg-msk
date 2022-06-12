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
} from "nexus"
import path, { resolve } from "path"
import cors from "micro-cors"
import prisma from "../../lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
                    where: { id: userId ?? undefined, email: email ?? undefined },
                })
            },
        })
        t.field("login", {
            type: "String",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            resolve: async (_, { email, password }) => {
                try {
                    const user = await prisma.user.findUnique({
                        where: { email },
                    })
                    if (!await bcrypt.compare(password, user.hashedPassword)) return null
                    return jwt.sign(user, 'secret')
                } catch {
                    return null
                }
            }
        })
        // t.field('post', {
        //   type: 'Post',
        //   args: {
        //     postId: nonNull(stringArg()),
        //   },
        //   resolve: (_, args) => {
        //     return prisma.post.findUnique({
        //       where: { id: Number(args.postId) },
        //     })
        //   },
        // })
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
    },
})

export const schema = makeSchema({
    types: [Query, Mutation, User, GQLDate],
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
