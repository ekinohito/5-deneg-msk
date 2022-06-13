import { useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import NavLink from "../../components/NavLink"
import VolunteerCard from "../../components/VolunteerCard"
import VolunteerProfile from "../../components/VolunteerProfile"

const VolunteerQuery = gql`
    query VolunteerQuery($id: Int!) {
        volunteer(id: $id) {
            id
            rating
            picture
            eventsCount
            user {
                name
            }
            dateOfBirth
            fullDescription
            skills
            langs
            interests
        }
    }
`

export default function Volunteer() {
    const router = useRouter()
    console.log(router.query.id)
    const { data, loading } = useQuery(VolunteerQuery, {
        variables: { id: Number(router.query.id) },
    })
    return (
        <Layout>
            <NavLink href="/volunteers" className="block mb-4">← Назад</NavLink>
            {loading ? (
                "Загрузка..."
            ) : (
                <VolunteerProfile
                    volunteer={{
                        ...data.volunteer,
                        name: data.volunteer.user.name,
                    }}
                />
            )}
        </Layout>
    )
}
