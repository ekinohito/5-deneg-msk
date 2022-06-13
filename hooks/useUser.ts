import { userInfo } from "os"
import create from "zustand"
import { persist } from "zustand/middleware"

interface User {
    jwt: string
    id: number
    name: string
    email: string
}

interface State {
    user: User | null
    login: (user: User) => void
    logout: () => void
}

export const useUser = create(
    persist<State>(
        set => ({
            user: null,
            login: user => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: "user",
        }
    )
)
