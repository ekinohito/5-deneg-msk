import { useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro"
import Layout from "../../components/Layout"
import VolunteerCard from "../../components/VolunteerCard"

const VolunteersQuery = gql`
    query VolunteerQuery {
        volunteers {
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

export default function Volunteers() {
    const { data, loading } = useQuery(VolunteersQuery)

    return (
        <Layout>
            <div className="flex flex-col space-y-4">
                {loading
                ? "Loading"
                : data.volunteers.map(volunteer => {
                    return <VolunteerCard volunteer={{...volunteer, name: volunteer.user.name}} />
                })}
            </div>
            
        </Layout>
    )
}
