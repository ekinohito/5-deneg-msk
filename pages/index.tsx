import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import SignupForm from "../components/SignupForm"
import BigButton from "../components/BigButton"
import Layout from "../components/Layout"

export default function Home() {
    return (
        <Layout>
            <h1 className="text-8xl font-bold mb-4 mt-[20vh]">
                Стань <span className="text-red-600">волонтером!</span>
            </h1>
            <div className="space-x-4">
                <BigButton>Стать волонтером</BigButton>
                <BigButton>Создать мероприятие</BigButton>
            </div>
        </Layout>
    )
}
