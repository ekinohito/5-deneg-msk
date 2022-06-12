import Link from "next/link"
import { VolunteerShort } from "../types/Volunteer"

interface Props {
    volunteer: VolunteerShort
}

export default function VolunteerCard({
    volunteer: {
        id,
        name,
        rating,
        eventsCount,
        picture,
        shortDescription,
    },
}: Props) {
    rating = rating / eventsCount
    const stars = Math.round(rating)
    return (
        <div className="bg-red-50 w-full p-4 rounded-md flex flex-row space-x-4">
            <img
                src={picture}
                className="h-32 aspect-square object-cover rounded-full"
            />
            <div className="flex flex-col justify-around text-lg grow">
                <h2 className="text-xl">{name}</h2>
                <h3 className="font-bold">
                    {rating.toFixed(1)}{" "}
                    <span className="text-red-400">{"★".repeat(stars)}</span>
                    <span className="text-red-200">
                        {"★".repeat(5 - stars)}
                    </span>
                </h3>
                <p className="text-gray-700">{shortDescription}</p>
                <Link href={`/volunteers/${id}`}>
                    <a className="self-end">Подробнее →</a>
                </Link>
            </div>
        </div>
    )
}
