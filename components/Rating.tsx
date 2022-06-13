import clsx from "clsx"

interface Props {
    className?: string
    rating: number
}

export default function Rating({ rating, className }: Props) {
    const stars = Math.round(rating)
    return (
        <div className={clsx("font-bold", className)}>
            <h3 className="inline mr-2">{rating.toFixed(1)}</h3>
            <span className="text-red-400">{"★".repeat(stars)}</span>
            <span className="text-red-200">{"★".repeat(5 - stars)}</span>
        </div>
    )
}
