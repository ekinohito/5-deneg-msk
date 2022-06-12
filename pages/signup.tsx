import Layout from "../components/Layout";
import SignupForm from "../components/SignupForm";

export default function Login() {
    return (
        <Layout>
            <div className="flex flex-col items-center">
                <SignupForm/>
            </div>
        </Layout>
    )
}