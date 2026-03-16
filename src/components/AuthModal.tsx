import { useState } from 'react'
import { X, Eye, EyeOff, User, Mail, Lock, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Tab = 'login' | 'register'

function AuthModal() {
  const { isModalOpen, closeModal, login, register } = useAuth()

  const [tab, setTab] = useState<Tab>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const reset = () => { setName(''); setEmail(''); setPassword(''); setConfirm(''); setError(null) }

  const switchTab = (t: Tab) => { setTab(t); reset() }

  const handleSubmit = () => {
    setError(null)

    if (tab === 'register') {
      if (!name.trim()) return setError('Please enter your full name.')
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email.')
      if (password.length < 6) return setError('Password must be at least 6 characters.')
      if (password !== confirm) return setError('Passwords do not match.')
      setLoading(true)
      setTimeout(() => {
        const err = register(name, email, password)
        if (err) setError(err)
        setLoading(false)
      }, 600)
    } else {
      if (!email.trim()) return setError('Please enter your email.')
      if (!password) return setError('Please enter your password.')
      setLoading(true)
      setTimeout(() => {
        const err = login(email, password)
        if (err) setError(err)
        setLoading(false)
      }, 600)
    }
  }

  if (!isModalOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-0 z-[80] flex sm:items-center sm:justify-center pointer-events-none">
        <div className="w-full sm:w-[420px] bg-[#f5f4f1]/95 backdrop-blur-2xl sm:rounded-3xl rounded-t-3xl border border-white/40 shadow-[0_-8px_40px_rgba(0,0,0,0.12)] sm:shadow-[0_8px_40px_rgba(0,0,0,0.12)] pointer-events-auto">
          {/* Handle (mobile) */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-[36px] h-[4px] bg-black/10 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2 sm:pt-5">
            <h2 className="text-[17px] font-semibold text-primary">
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
            <button
              onClick={closeModal}
              className="w-[36px] h-[36px] flex items-center justify-center rounded-xl bg-white/60 border border-white/40 text-secondary"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tab switcher */}
          <div className="flex mx-5 mb-4 bg-white/40 backdrop-blur-xl rounded-xl border border-white/30 p-1">
            <button
              onClick={() => switchTab('login')}
              className={`flex-1 h-[38px] rounded-lg text-[13px] font-medium transition-all ${tab === 'login' ? 'bg-white/80 text-primary shadow-sm' : 'text-secondary'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab('register')}
              className={`flex-1 h-[38px] rounded-lg text-[13px] font-medium transition-all ${tab === 'register' ? 'bg-white/80 text-primary shadow-sm' : 'text-secondary'}`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <div className="px-5 pb-5 flex flex-col gap-3">
            {/* Name (register only) */}
            {tab === 'register' && (
              <InputField
                icon={<User size={15} />}
                type="text"
                placeholder="Full name"
                value={name}
                onChange={setName}
              />
            )}

            <InputField
              icon={<Mail size={15} />}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={setEmail}
            />

            <div className="relative">
              <InputField
                icon={<Lock size={15} />}
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={setPassword}
                onEnter={tab === 'login' ? handleSubmit : undefined}
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[32px] h-[32px] flex items-center justify-center text-secondary"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Confirm password (register only) */}
            {tab === 'register' && (
              <InputField
                icon={<Lock size={15} />}
                type={showPw ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirm}
                onChange={setConfirm}
                onEnter={handleSubmit}
              />
            )}

            {/* Error */}
            {error && (
              <p className="text-[12px] text-danger bg-danger/8 border border-danger/20 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`h-[50px] rounded-xl text-[14px] font-semibold transition-all active:scale-[0.97] flex items-center justify-center gap-2 mt-1 ${loading ? 'bg-primary/60 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-light'}`}
            >
              {loading ? (
                <span className="w-[18px] h-[18px] border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : tab === 'login' ? (
                'Sign In'
              ) : (
                <><Check size={16} strokeWidth={2.5} /> Create Account</>
              )}
            </button>

            {/* Switch hint */}
            <p className="text-center text-[12px] text-secondary">
              {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}
                className="text-accent-dark font-medium underline underline-offset-2"
              >
                {tab === 'login' ? 'Register' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function InputField({
  icon, type, placeholder, value, onChange, onEnter,
}: {
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  onEnter?: () => void
}) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3.5 text-secondary/60 pointer-events-none">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
        className="w-full h-[48px] bg-white/60 rounded-xl border border-white/40 pl-10 pr-4 text-[14px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
      />
    </div>
  )
}

export default AuthModal
