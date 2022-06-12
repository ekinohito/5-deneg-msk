import clsx from "clsx"

interface Props {
    children: React.ReactNode
}

export default function BigButton({ children }: Props) {
    return (
        <button
            className={clsx(
                "p-4 rounded-full text-lg font-bold",
                "border-4 border-red-600 text-red-600 ",
                "hover:bg-red-600 hover:text-white transition-colors duration-200"
            )}
        >
            {children}
        </button>
    )
}
