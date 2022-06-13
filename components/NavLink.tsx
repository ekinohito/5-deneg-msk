import clsx from "clsx"
import Link from "next/link"

interface Props {
    href: string
    children: React.ReactNode
    className?: string
}

export default function NavLink({ href, children, className }: Props) {
    return (
        <Link href={href}>
            <a className={clsx("font-bold text-red-600", className)}>{children}</a>
        </Link>
    )
}
