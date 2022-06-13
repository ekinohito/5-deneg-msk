import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro"
import { Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useUser } from "../hooks/useUser"
import Button from "./Button"
import TextField from "./TextField"

const VolunteerQuery = gql`
    query VolunteerQuery($id: Int!) {
        volunteer2(id: $id) {
            id
            rating
            picture
            eventsCount
            user {
                name
            }
            dateOfBirth
            shortDescription
            fullDescription
            skills
            langs
            interests
        }
    }
`

const UpsertVolunteerMutation = gql`
    mutation UpsertVolunteer(
        $id: Int!
        $skills: String!
        $langs: String!
        $interests: String!
        $fullDescription: String!
        $dateOfBirth: String
        $picture: String
        $shortDescription: String
    ) {
        upsertVolunteer(
            id: $id
            skills: $skills
            langs: $langs
            interests: $interests
            fullDescription: $fullDescription
            dateOfBirth: $dateOfBirth
            picture: $picture
            shortDescription: $shortDescription
        ) {
            id
            dateOfBirth
            fullDescription
            interests
            langs
            skills
            shortDescription
            eventsCount
            rating
            picture
        }
    }
`

interface Values {
    shortDescription?: string
    picture?: string
    skills: string
    langs: string
    interests: string
    fullDescription: string
    dateOfBirth?: string
}

export default function VolunteerForm() {
    const [upsert] = useMutation(UpsertVolunteerMutation)
    const user = useUser(state => state.user)
    const { data, loading } = useQuery(VolunteerQuery, {
        variables: { id: user && user.id },
    })
    const router = useRouter()
    useEffect(() => {
        if (!user) router.push("/login")
    }, [user])
    if (!user) return
    if (loading) return

    return (
        <Formik
            initialValues={
                (data.volunteer2 as Values) ??
                ({
                    shortDescription: "",
                    picture: "",
                    skills: "",
                    langs: "",
                    interests: "",
                    fullDescription: "",
                    dateOfBirth: "",
                } as Values)
            }
            onSubmit={async (
                values: Values,
                { setFieldError }: FormikHelpers<Values>
            ) => {
                const { data } = await upsert({
                    variables: {
                        ...values,
                        id: user.id,
                        dateOfBirth: new Date(values.dateOfBirth).toJSON(),
                    },
                })
            }}
            validate={values => {
                const errors: Partial<Record<keyof Values, string>> = {}

                if (!values.dateOfBirth) {
                    errors.dateOfBirth = "Введите дату"
                } else if (!new Date(values.dateOfBirth).toJSON()) {
                    errors.dateOfBirth = "Введите дату в формате ГГГГ-ММ-ДД"
                }

                if (!values.skills) {
                    errors.skills = "Это обязательное поле"
                }
                if (!values.langs) {
                    errors.langs = "Это обязательное поле"
                }
                if (!values.interests) {
                    errors.interests = "Это обязательное поле"
                }
                if (!values.fullDescription) {
                    errors.skills = "Это обязательное поле"
                }

                return errors
            }}
        >
            {({ touched, errors }) => (
                <Form className="flex flex-col w-96 text-md bg-gray-50 rounded-lg p-4 space-y-4">
                    <TextField
                        name="dateOfBirth"
                        placeholder="Дата рождения"
                        error={touched.dateOfBirth && errors.dateOfBirth}
                    />
                    <TextField
                        name="picture"
                        placeholder="Ссылка на фотографию"
                        error={false}
                    />
                    <TextField
                        name="skills"
                        placeholder="Ваши навыки"
                        error={touched.skills && errors.skills}
                    />
                    <TextField
                        name="langs"
                        placeholder="Владение языками"
                        error={touched.langs && errors.langs}
                    />
                    <TextField
                        name="interests"
                        placeholder="Интересующие направления"
                        error={touched.interests && errors.interests}
                    />
                    <TextField
                        name="shortDescription"
                        placeholder="О себе (пару слов)"
                        error={false}
                    />
                    <TextField
                        multi
                        name="fullDescription"
                        placeholder="О себе (поподробнее)"
                        error={
                            touched.fullDescription && errors.fullDescription
                        }
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            )}
        </Formik>
    )
}
