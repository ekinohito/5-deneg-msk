import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import SignupForm from "../components/SignupForm"

export default function Home() {
  return (
    <main>
      <SignupForm />
    </main>
  )
}
