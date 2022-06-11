import { Field } from "formik"

interface Props {
    name: string
    placeholder: string
    type?: 'email' | 'password'
    error?: false | string
}

export default function TextField({name, placeholder, type, error}: Props) {
    return (
        <div>
            <label className="mx-1">{placeholder}</label>
            <Field type={type} id={name} name={name} className="rounded-lg p-2 w-full" placeholder={placeholder}/>
            <div className="text-red-700">{error}</div>
        </div>
    )
}
