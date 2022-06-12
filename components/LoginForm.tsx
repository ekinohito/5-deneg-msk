import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { useEffect } from "react"
import { useUser } from "../hooks/useUser"
import Button from "./Button"
import TextField from "./TextField"

const LoginQuery = gql`
    query LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password)
        user(email: $email) {
            id,
            name,
            email,
        }
    }
`

interface Values {
    email: string
    password: string
}

export default function LoginForm() {
    const [login] = useLazyQuery(LoginQuery)
    const stateLogin = useUser(state => state.login)
    return (
        <Formik
            initialValues={
                {
                    email: "",
                    password: "",
                } as Values
            }
            onSubmit={async (
                { email, password }: Values,
                { setFieldError }: FormikHelpers<Values>
            ) => {
                const { data } = await login({
                    variables: {
                        email,
                        password,
                    },
                })
                if (data.login === null) {
                    setFieldError("email", "Неверная почта или пароль")
                } else {
                    stateLogin({...data.user, jwt: data.login})
                }

            }}
            validate={values => {
                const errors: Partial<Record<keyof Values, string>> = {}

                if (!values.email) {
                    errors.email = "Введите почту"
                }

                if (!values.password) {
                    errors.password = "Введите пароль"
                }

                return errors
            }}
        >
            {({ touched, errors }) => (
                <Form className="flex flex-col w-96 text-md bg-red-100 rounded-lg p-4 space-y-4">
                    <TextField name="email" placeholder="E-mail" type="email" error={touched.email && errors.email}/>
                    <TextField
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        error={touched.password && errors.password}
                    />
                    <Button type="submit">Войти</Button>
                </Form>
            )}
        </Formik>
    )
}
