import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<Element> {}

export default function BigButton({ children, className, ...rest }: Props) {
    return (
        <button
            className={clsx(
                "p-4 rounded-full text-lg font-bold",
                "border-4 border-red-600 text-red-600 ",
                "hover:bg-red-600 hover:text-white transition-colors duration-200",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
