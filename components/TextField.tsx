import { Field } from "formik"

interface Props {
    name: string
    placeholder: string
    type?: 'email' | 'password'
    error?: false | string
    multi?: true
}

export default function TextField({name, placeholder, type, error, multi}: Props) {
    return (
        <div>
            <label className="mx-1">{placeholder}</label>
            <Field as={multi?"textarea":undefined} type={type} id={name} name={name} className="rounded-lg p-2 w-full" placeholder={placeholder}/>
            <div className="text-red-700">{error}</div>
        </div>
    )
}
