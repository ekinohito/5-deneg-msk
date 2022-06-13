import Link from "next/link"
import { Volunteer } from "../types/Volunteer"
import AgeLabel from "./AgeLabel"
import GridItem from "./GridItem"
import Photo from "./Photo"
import Rating from "./Rating"

interface Props {
    volunteer: Volunteer
}

export default function VolunteerProfile({
    volunteer: {
        name,
        rating,
        eventsCount,
        picture,
        dateOfBirth,
        fullDescription,
        interests,
        skills,
        langs,
    },
}: Props) {
    return (
        <div className="w-full p-4 rounded-md flex flex-row space-x-4">
            <Photo picture={picture}/>
            <div className="flex flex-col justify-around text-lg grow">
                <h2 className="text-2xl font-bold">{name}</h2>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <GridItem label="Рейтинг:">
                        <Rating className="text-2xl" rating={eventsCount === 0 ? 0 : rating / eventsCount} />
                    </GridItem>
                    <GridItem label="Посещенных мероприятий">
                        <span className="text-2xl font-bold">{eventsCount}</span>
                    </GridItem>
                    <GridItem label="Возраст:">
                        <AgeLabel dateOfBirth={dateOfBirth} />
                    </GridItem>
                    <GridItem label="Языки:">
                        {langs}
                    </GridItem>
                    <GridItem label="Навыки:">
                        {skills}
                    </GridItem>
                    <GridItem label="Интересы:">
                        {interests}
                    </GridItem>
                    <GridItem label="О себе:" className="col-span-2">
                        {fullDescription}
                    </GridItem>
                </div>
            </div>
        </div>
    )
}
