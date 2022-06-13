interface Props {
    label: string
    children: React.ReactNode
    className?: string
}

export default function GridItem({className, children, label}: Props) {
    return (
        <div className={className}>
            <h3 className="text-gray-400 text-md">{label}</h3>
            <p className="text-lg">{children}</p>
        </div>
    )
}