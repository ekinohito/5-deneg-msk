import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { useUser } from "../hooks/useUser";

export default function Login() {
    const { user, logout } = useUser()
    const router = useRouter()
    useEffect(() => {
        if (!user) router.push("/login")
    }, [user])
    if (!user) return

    return (
        <Layout>
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-2xl">Вы зашли как <span className="font-bold">{user.name}</span></h1>
                <Button onClick={logout}>Выйти</Button>
                <Button onClick={() => router.push('/volunteers/edit')}>Редактировать анкету</Button>
            </div>
        </Layout>
    )
}