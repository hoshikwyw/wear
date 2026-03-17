import { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '../types/user'
import { supabase } from '../lib/supabase'

interface AuthContextValue {
  user: User | null
  isModalOpen: boolean
  openModal: (onSuccess?: () => void) => void
  closeModal: () => void
  login: (email: string, password: string) => Promise<string | null>
  register: (name: string, email: string, password: string) => Promise<string | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function fetchProfile(userId: string): Promise<User | null> {
  const { data } = await supabase
    .from('profiles')
    .select('id, name, email, role')
    .eq('id', userId)
    .single()
  if (!data) return null
  return { id: data.id, name: data.name, email: data.email, role: data.role }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [onSuccessCb, setOnSuccessCb] = useState<(() => void) | null>(null)

  useEffect(() => {
    // Load session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const profile = await fetchProfile(session.user.id)
        setUser(profile)
      }
    })

    // Keep in sync with Supabase auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const profile = await fetchProfile(session.user.id)
        setUser(profile)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const openModal = (onSuccess?: () => void) => {
    setOnSuccessCb(() => onSuccess ?? null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setOnSuccessCb(null)
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    onSuccessCb?.()
    setOnSuccessCb(null)
  }

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return error.message
    handleSuccess()
    return null
  }

  const register = async (name: string, email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) return error.message
    handleSuccess()
    return null
  }

  const logout = () => { supabase.auth.signOut() }

  return (
    <AuthContext.Provider value={{ user, isModalOpen, openModal, closeModal, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
