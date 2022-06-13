import { useLazyQuery, useMutation } from "@apollo/client"
import { gql } from "apollo-server-micro"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { useUser } from "../hooks/useUser"
import Button from "./Button"
import TextField from "./TextField"

const SignupMutation = gql`
    mutation SignupUser($name: String!, $email: String!, $password: String!) {
        signupUser(name: $name, email: $email, password: $password) {
            id
        }
    }
`

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
    firstName: string
    lastName: string
    password: string
}

export default function SignupForm() {
    const [signup] = useMutation(SignupMutation)
    const [login] = useLazyQuery(LoginQuery)
    const stateLogin = useUser(state => state.login)
    return (
        <Formik
            initialValues={
                {
                    email: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                } as Values
            }
            onSubmit={async (
                { email, firstName, lastName, password }: Values,
                { setFieldError }: FormikHelpers<Values>
            ) => {
                try {
                    await signup({
                        variables: {
                            email,
                            name: `${lastName} ${firstName}`,
                            password,
                        },
                    })
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
                } catch {
                    setFieldError('email', 'Почта занята')
                }
            }}
            validate={values => {
                const errors: Partial<Record<keyof Values, string>> = {}

                if (!values.email) {
                    errors.email = "Введите почту"
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        values.email
                    )
                ) {
                    errors.email = "Некорректный адрес электронной почты"
                }

                if (!values.firstName) {
                    errors.firstName = "Введите имя"
                }
                
                if (!values.lastName) {
                    errors.lastName = "Введите фамилию"
                }

                if (!values.password) {
                    errors.password = "Введите пароль"
                } else if (values.password.length < 8) {
                    errors.password = "Минимальная длина – 8 символов"
                }

                return errors
            }}
        >
            {({ touched, errors }) => (
                <Form className="flex flex-col w-96 text-md  bg-gray-50 rounded-lg p-4 space-y-4">
                    <TextField name="email" placeholder="E-mail" type="email" error={touched.email && errors.email}/>
                    <TextField name="firstName" placeholder="Имя" error={touched.firstName && errors.firstName}/>
                    <TextField name="lastName" placeholder="Фамилия" error={touched.lastName && errors.lastName}/>
                    <TextField
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        error={touched.password && errors.password}
                    />
                    <Button type="submit">Зарегистрироваться</Button>
                </Form>
            )}
        </Formik>
    )
}
