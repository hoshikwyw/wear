import { useState } from 'react'
import { ArrowLeft, User, ShoppingBag, Pencil, Check, X, Lock, Eye, EyeOff, Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import type { OrderStatus } from '../types/admin'

type Tab = 'account' | 'orders'

interface Props {
  onBack: () => void
}

const statusStyle: Record<OrderStatus, { label: string; className: string }> = {
  pending:    { label: 'Pending',    className: 'bg-amber-100 text-amber-700 border-amber-200' },
  processing: { label: 'Processing', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  shipped:    { label: 'Shipped',    className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  delivered:  { label: 'Delivered',  className: 'bg-green-100 text-green-700 border-green-200' },
  cancelled:  { label: 'Cancelled',  className: 'bg-red-100 text-red-600 border-red-200' },
}

function UserProfile({ onBack }: Props) {
  const { user, updateProfile, updatePassword } = useAuth()
  const [tab, setTab] = useState<Tab>('account')

  // — Name editing —
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(user?.name ?? '')
  const [nameSaving, setNameSaving] = useState(false)
  const [nameMsg, setNameMsg] = useState<{ text: string; ok: boolean } | null>(null)

  const saveName = async () => {
    if (!nameVal.trim() || nameVal.trim() === user?.name) { setEditingName(false); return }
    setNameSaving(true)
    setNameMsg(null)
    const err = await updateProfile({ name: nameVal.trim() })
    setNameMsg(err ? { text: err, ok: false } : { text: 'Name updated.', ok: true })
    setNameSaving(false)
    if (!err) setEditingName(false)
  }

  const cancelName = () => { setNameVal(user?.name ?? ''); setEditingName(false); setNameMsg(null) }

  // — Password change —
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean } | null>(null)

  const savePassword = async () => {
    setPwMsg(null)
    if (newPw.length < 6) return setPwMsg({ text: 'Password must be at least 6 characters.', ok: false })
    if (newPw !== confirmPw) return setPwMsg({ text: 'Passwords do not match.', ok: false })
    setPwSaving(true)
    const err = await updatePassword(newPw)
    setPwMsg(err ? { text: err, ok: false } : { text: 'Password updated successfully.', ok: true })
    if (!err) { setNewPw(''); setConfirmPw('') }
    setPwSaving(false)
  }

  return (
    <div className="min-h-[100dvh] bg-[#f2f0ed]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[640px] mx-auto flex items-center h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <button
            onClick={onBack}
            className="w-[44px] h-[44px] flex items-center justify-center -ml-2 text-primary active:scale-[0.95] transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="flex-1 text-center text-[13px] font-medium text-primary pr-[44px]">My Account</span>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-4 sm:px-6 pb-12">
        {/* Avatar + name header */}
        <div className="flex flex-col items-center py-8 gap-3">
          <div className="w-[72px] h-[72px] bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-[28px] font-bold text-accent-dark">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-center">
            <p className="text-[17px] font-semibold text-primary">{user?.name}</p>
            <p className="text-[13px] text-secondary">{user?.email}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white/40 backdrop-blur-xl rounded-xl border border-white/30 p-1 mb-6">
          <button
            onClick={() => setTab('account')}
            className={`flex-1 flex items-center justify-center gap-1.5 h-[40px] rounded-lg text-[13px] font-medium transition-all ${tab === 'account' ? 'bg-white/80 text-primary shadow-sm' : 'text-secondary'}`}
          >
            <User size={14} /> Account
          </button>
          <button
            onClick={() => setTab('orders')}
            className={`flex-1 flex items-center justify-center gap-1.5 h-[40px] rounded-lg text-[13px] font-medium transition-all ${tab === 'orders' ? 'bg-white/80 text-primary shadow-sm' : 'text-secondary'}`}
          >
            <ShoppingBag size={14} /> Orders
          </button>
        </div>

        {/* — ACCOUNT TAB — */}
        {tab === 'account' && (
          <div className="flex flex-col gap-4">
            {/* Name card */}
            <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">Full Name</p>
                {!editingName && (
                  <button onClick={() => setEditingName(true)} className="flex items-center gap-1 text-[12px] text-accent-dark">
                    <Pencil size={12} /> Edit
                  </button>
                )}
              </div>
              {editingName ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    className="h-[44px] bg-white/60 rounded-xl border border-white/40 px-4 text-[14px] text-primary focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && saveName()}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={saveName} disabled={nameSaving}
                      className="flex-1 h-[40px] bg-primary text-white text-[13px] font-medium rounded-xl flex items-center justify-center gap-1.5 disabled:opacity-60">
                      {nameSaving ? <span className="w-[14px] h-[14px] border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
                    </button>
                    <button onClick={cancelName} className="h-[40px] px-4 bg-white/50 border border-white/40 text-secondary rounded-xl">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[15px] text-primary font-medium">{user?.name}</p>
              )}
              {nameMsg && (
                <p className={`text-[12px] mt-2 ${nameMsg.ok ? 'text-green-600' : 'text-danger'}`}>{nameMsg.text}</p>
              )}
            </div>

            {/* Email card (read-only) */}
            <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4">
              <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-3">Email Address</p>
              <p className="text-[15px] text-primary font-medium">{user?.email}</p>
              <p className="text-[11px] text-secondary mt-1">Email cannot be changed after registration.</p>
            </div>

            {/* Password card */}
            <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={14} className="text-secondary" />
                <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">Change Password</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder="New password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full h-[46px] bg-white/60 rounded-xl border border-white/40 px-4 pr-11 text-[13px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && savePassword()}
                  className="h-[46px] bg-white/60 rounded-xl border border-white/40 px-4 text-[13px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                />
                {pwMsg && (
                  <p className={`text-[12px] ${pwMsg.ok ? 'text-green-600' : 'text-danger'}`}>{pwMsg.text}</p>
                )}
                <button onClick={savePassword} disabled={pwSaving || !newPw || !confirmPw}
                  className="h-[46px] bg-primary text-white text-[13px] font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all">
                  {pwSaving ? <span className="w-[16px] h-[16px] border-2 border-white/40 border-t-white rounded-full animate-spin" /> : 'Update Password'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* — ORDERS TAB — */}
        {tab === 'orders' && (
          <OrdersTab />
        )}
      </div>
    </div>
  )
}

function OrdersTab() {
  // Orders will be populated once an orders table is connected.
  // Showing empty state for now.
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-[64px] h-[64px] bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 flex items-center justify-center">
        <Package size={26} className="text-secondary" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <p className="text-[15px] font-medium text-primary mb-1">No orders yet</p>
        <p className="text-[13px] text-secondary">Your order history will appear here once you place an order.</p>
      </div>
    </div>
  )
}

export { statusStyle }
export default UserProfile
