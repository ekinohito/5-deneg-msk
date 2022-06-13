import clsx from "clsx"
import Link from "next/link"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<Element> {
    href: string
}

export default function BigButton({ children, className, href, ...rest }: Props) {
    return (
        <Link href={href}>
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
        </Link>
    )
}
