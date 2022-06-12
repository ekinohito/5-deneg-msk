import Layout from "../../components/Layout"
import VolunteerCard from "../../components/VolunteerCard"

export default function Volunteers() {
    return (
        <Layout>
            <VolunteerCard volunteer={{ id: 1, name: "Рыжик", rating: 0.9, picture: 'https://www.armadatekstil.net/wp-content/uploads/2014/09/orange-american-shorthair-kittens.jpg', shortDescription: "Просто котик" }} />
        </Layout>
    )
}
