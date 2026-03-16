import { createContext, useContext, useState, useEffect } from 'react'
import type { User, StoredUser } from '../types/user'

const USERS_KEY = 'wear_users'
const SESSION_KEY = 'wear_session'

interface AuthContextValue {
  user: User | null
  isModalOpen: boolean
  openModal: (onSuccess?: () => void) => void
  closeModal: () => void
  login: (email: string, password: string) => string | null   // returns error or null
  register: (name: string, email: string, password: string) => string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
function getSession(): User | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getSession)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [onSuccessCb, setOnSuccessCb] = useState<(() => void) | null>(null)

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user])

  const openModal = (onSuccess?: () => void) => {
    setOnSuccessCb(() => onSuccess ?? null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setOnSuccessCb(null)
  }

  const handleSuccess = (loggedIn: User) => {
    setUser(loggedIn)
    setIsModalOpen(false)
    onSuccessCb?.()
    setOnSuccessCb(null)
  }

  const login = (email: string, password: string): string | null => {
    const users = getUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!found) return 'Incorrect email or password.'
    handleSuccess({ id: found.id, name: found.name, email: found.email })
    return null
  }

  const register = (name: string, email: string, password: string): string | null => {
    const users = getUsers()
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return 'An account with this email already exists.'
    }
    const newUser: StoredUser = { id: `u_${Date.now()}`, name: name.trim(), email: email.trim().toLowerCase(), password }
    saveUsers([...users, newUser])
    handleSuccess({ id: newUser.id, name: newUser.name, email: newUser.email })
    return null
  }

  const logout = () => { setUser(null) }

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
