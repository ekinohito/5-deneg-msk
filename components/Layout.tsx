import Link from "next/link"

interface Props {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
    return (
        <>
            <header className="bg-red-600 w-full text-white mb-6">
                <div className="flex flex-row items-center justify-between max-w-screen-lg mx-auto h-16">
                    <h1 className="text-xl font-semibold">5 Денег – Волонтеры Москвы</h1>
                    <Link href="/login">Войти</Link>
                </div>
            </header>
            <main className="max-w-screen-lg mx-auto">
                {children}
            </main>
        </>
    )
}