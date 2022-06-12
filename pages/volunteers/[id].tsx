import { useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import VolunteerCard from "../../components/VolunteerCard"

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
            shortDescription
        }
    }
`

export default function Volunteer() {
    const router = useRouter()
    console.log(router.query.id)
    const { data, loading } = useQuery(VolunteerQuery, {variables: {id: Number(router.query.id)}})
    return (
        <Layout>
            {loading ? (
                "Loading"
            ) : (
                <VolunteerCard
                    volunteer={{
                        ...data.volunteer,
                        name: data.volunteer.user.name,
                    }}
                />
            )}
        </Layout>
    )
}
