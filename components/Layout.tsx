import Link from "next/link"
import { useHasHydrated } from "../hooks/useHasHydrated"
import { useUser } from "../hooks/useUser"

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    const user = useUser(state => state.user)
    const hasHydrated = useHasHydrated()
    return (
        <>
            <header className="bg-red-600 w-full text-white mb-6">
                <div className="flex flex-row items-center justify-between max-w-screen-lg mx-auto px-4 h-16">
                    <div className="space-x-4">
                        <Link href="/">
                            <a className="text-xl font-semibold">
                                5 Денег
                                {/* – Волонтеры Москвы */}
                            </a>
                        </Link>
                        <Link href="/volunteers">Волонтеры</Link>
                    </div>
                    {hasHydrated && user ? (
                        <Link href="/user">
                            <a>{user.name}</a>
                        </Link>
                    ) : (
                        <div className="space-x-4">
                            <Link href="/login">Войти</Link>
                            <Link href="/signup">Зарегистрироваться</Link>
                        </div>
                    )}
                </div>
            </header>
            <main className="max-w-screen-lg mx-auto px-4">{children}</main>
        </>
    )
}
