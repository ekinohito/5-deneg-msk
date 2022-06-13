interface Props {
    className?: string
    dateOfBirth: string
}

export default function AgeLabel({dateOfBirth, className}: Props) {
    const timeBirth = new Date(dateOfBirth).getTime()
    const timeCurrent = new Date().getTime()
    const diffTime = Math.abs(timeCurrent - timeBirth)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
    return (
        <p className={className}>{diffDays}</p>
    )
}