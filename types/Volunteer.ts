export interface VolunteerShort {
    id: number
    name: string
    rating: number
    eventsCount: number
    shortDescription?: string
    picture?: string
}

export interface Volunteer extends VolunteerShort {
    skills: string
    langs: string
    interests: string
    fullDescription: string
    dateOfBirth: string
}
