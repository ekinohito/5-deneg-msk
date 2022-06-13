import Layout from "../../components/Layout";
import LoginForm from "../../components/LoginForm";
import VolunteerForm from "../../components/VolunteerForm";

export default function Login() {
    return (
        <Layout>
            <div className="flex flex-col items-center">
                <VolunteerForm/>
            </div>
        </Layout>
    )
}