export interface VolunteerShort {
    id: number
    name: string
    rating: number
    eventsCount: number
    shortDescription?: string
    picture?: string
}

export interface Volunteer extends VolunteerShort {
    languages: string[]
    skills: string[]
    interests: string[]
    description: string
}