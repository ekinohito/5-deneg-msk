import React, { useState } from "react"
import Layout from "../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const SignupMutation = gql`
  mutation SignupMutation($name: String, $email: String!) {
    signupUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`

function Signup(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [signup] = useMutation(SignupMutation)

  return (
    <Layout>
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault()
            console.log("submit", name, email)

            await signup({
              variables: {
                name: name,
                email: email,
              },
            })
            Router.push("/")
          }}
        >
          <h1>Signup user</h1>
          <input
            autoFocus
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address)"
            type="text"
            value={email}
          />
          <input disabled={!name || !email} type="submit" value="Signup" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  )
}

export default Signup
