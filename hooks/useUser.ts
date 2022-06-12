import create from 'zustand'

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

export const useUser = create<State>(set => ({
    user: null,
    login: user => set({ user }),
    logout: () => set({ user: null })
  }))