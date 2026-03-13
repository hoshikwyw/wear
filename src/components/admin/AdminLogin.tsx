import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react'

// Temporary frontend-only credentials — replace with Supabase auth later
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'wear2026'

interface Props {
  onLogin: () => void
  onBack: () => void
}

function AdminLogin({ onLogin, onBack }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        onLogin()
      } else {
        setError('Invalid username or password.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-[100dvh] bg-[#f2f0ed] flex flex-col">
      {/* Top bar */}
      <div className="px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[860px] mx-auto flex items-center h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <button
            onClick={onBack}
            className="w-[44px] h-[44px] flex items-center justify-center -ml-2 text-primary active:scale-[0.95] transition-transform"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      </div>

      {/* Login card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[380px]">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-[64px] h-[64px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center">
              <ShieldCheck size={28} className="text-accent" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-[22px] font-semibold text-primary text-center mb-1">Admin Access</h1>
          <p className="text-[13px] text-secondary text-center mb-8">Sign in to manage products</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-primary uppercase tracking-wider px-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="h-[50px] bg-white/50 backdrop-blur-xl rounded-xl border border-white/40 px-4 text-[14px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-primary uppercase tracking-wider px-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full h-[50px] bg-white/50 backdrop-blur-xl rounded-xl border border-white/40 px-4 pr-12 text-[14px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center text-secondary"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[12px] text-danger bg-danger/5 border border-danger/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="mt-2 h-[52px] bg-primary text-white text-[14px] font-semibold rounded-xl active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
