import Link from "next/link"
import { VolunteerShort } from "../types/Volunteer"
import Photo from "./Photo"
import Rating from "./Rating"

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
    return (
        <div className="bg-gray-50 w-full p-4 rounded-md flex flex-row space-x-4">
            <Photo picture={picture}/>
            <div className="flex flex-col justify-around text-lg grow">
                <h2 className="text-xl">{name}</h2>
                <Rating rating={eventsCount === 0 ? 0 : rating / eventsCount}/>
                <p className="text-gray-700">{shortDescription}</p>
                <Link href={`/volunteers/${id}`}>
                    <a className="self-end">Подробнее →</a>
                </Link>
            </div>
        </div>
    )
}
