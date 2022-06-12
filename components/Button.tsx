import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<Element> {}

export default function Button({ children, className, ...rest }: Props) {
    return (
        <button
            className={clsx(
                "p-2 rounded-md text-lg font-bold",
                "border-4 border-red-600 hover:text-red-600 hover:bg-transparent",
                "bg-red-600 text-white transition-colors duration-200",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
