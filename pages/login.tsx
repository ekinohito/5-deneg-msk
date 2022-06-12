import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

export default function Login() {
    return (
        <Layout>
            <div className="flex flex-col items-center">
                <LoginForm/>
            </div>
        </Layout>
    )
}