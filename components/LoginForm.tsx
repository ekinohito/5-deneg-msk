import { useMutation } from "@apollo/client"
import { gql } from "apollo-server-micro"
import { Field, Form, Formik, FormikHelpers } from "formik"
import TextField from "./TextField"

const SignupMutation = gql`
    mutation SignupUser($name: String!, $email: String!, $password: String!) {
        signupUser(name: $name, email: $email, password: $password) {
            id
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
                <Form className="flex flex-col w-96 text-md bg-slate-200 p-4 space-y-2">
                    <TextField name="email" placeholder="E-mail" type="email" error={touched.email && errors.email}/>
                    <TextField name="firstName" placeholder="Имя" error={touched.firstName && errors.firstName}/>
                    <TextField name="lastName" placeholder="Фамилия" error={touched.lastName && errors.lastName}/>
                    <TextField
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        error={touched.password && errors.password}
                    />

                    <button type="submit">Зарегистрироваться</button>
                </Form>
            )}
        </Formik>
    )
}
