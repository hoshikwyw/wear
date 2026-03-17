import { useState, useRef, useEffect } from 'react'
import { Search, ShoppingBag, Menu, X, User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

interface Props {
  onAdminAccess?: () => void
}

function Navbar({ onAdminAccess }: Props) {
  const [open, setOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { count, openCart } = useCart()
  const { user, openModal, logout } = useAuth()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 px-3 pt-2 sm:px-4 sm:pt-3">
      <nav className="mx-auto w-full max-w-[860px] bg-white/50 backdrop-blur-2xl backdrop-saturate-150 rounded-xl sm:rounded-2xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]">
        {/* Main bar */}
        <div className="flex items-center justify-between h-[48px] px-4 sm:px-5">
          {/* Logo */}
          <a href="/" className="text-[15px] sm:text-[16px] font-semibold tracking-[3px] text-primary/85">
            WEAR
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {['New Arrivals', 'Categories', 'Men', 'Women', 'Unisex'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-[12px] font-medium text-primary/45 hover:text-primary hover:bg-white/50 px-3 py-1.5 rounded-lg transition-all"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center">
            <button
              className="w-[44px] h-[44px] flex items-center justify-center text-primary/35 hover:text-primary/70 rounded-xl hover:bg-white/40 active:bg-white/50 transition-all"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* User button — desktop */}
            <div ref={menuRef} className="relative hidden sm:block">
              {user ? (
                <button
                  onClick={() => setUserMenu((v) => !v)}
                  className="flex items-center gap-1.5 h-[44px] px-2 text-primary/70 hover:text-primary rounded-xl hover:bg-white/40 transition-all"
                  aria-label="Account"
                >
                  <div className="w-[26px] h-[26px] bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-[11px] font-bold text-accent-dark">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[12px] font-medium max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={13} className={`transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  onClick={() => openModal()}
                  className="w-[44px] h-[44px] flex items-center justify-center text-primary/35 hover:text-primary/70 rounded-xl hover:bg-white/40 transition-all"
                  aria-label="Sign in"
                >
                  <User size={18} strokeWidth={1.5} />
                </button>
              )}

              {/* User dropdown */}
              {userMenu && user && (
                <div className="absolute right-0 top-[calc(100%+6px)] w-[200px] bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-black/5">
                    <p className="text-[13px] font-semibold text-primary truncate">{user.name}</p>
                    <p className="text-[11px] text-secondary truncate">{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="inline-block mt-1 text-[9px] font-semibold tracking-widest uppercase text-accent-dark bg-accent/10 px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => { setUserMenu(false); onAdminAccess?.() }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-primary hover:bg-black/5 transition-colors border-b border-black/5"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => { logout(); setUserMenu(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-danger hover:bg-danger/5 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={openCart}
              className="relative w-[44px] h-[44px] flex items-center justify-center text-primary/35 hover:text-primary/70 rounded-xl hover:bg-white/40 active:bg-white/50 transition-all"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-0.5 bg-accent text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            <button
              className="md:hidden w-[44px] h-[44px] flex items-center justify-center text-primary/50 rounded-xl hover:bg-white/40 active:bg-white/50 transition-all"
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-black/5 px-2 py-2">
            {['New Arrivals', 'Categories', 'Men', 'Women', 'Unisex'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="flex items-center h-[48px] px-4 text-[15px] text-primary/60 hover:text-primary active:bg-white/40 rounded-xl transition-all"
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            ))}
            {/* Mobile account row */}
            <div className="border-t border-black/5 mt-1 pt-1">
              {user ? (
                <>
                  <div className="flex items-center justify-between px-4 h-[48px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[28px] h-[28px] bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-[11px] font-bold text-accent-dark">{user.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] text-primary font-medium leading-tight">{user.name.split(' ')[0]}</span>
                        {user.role === 'admin' && (
                          <span className="text-[9px] font-semibold tracking-widest uppercase text-accent-dark">Admin</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => { logout(); setOpen(false) }} className="flex items-center gap-1.5 text-[13px] text-danger">
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => { setOpen(false); onAdminAccess?.() }}
                      className="flex items-center gap-2 w-full h-[48px] px-4 text-[14px] text-primary/70 hover:text-primary active:bg-white/40 rounded-xl transition-all"
                    >
                      <LayoutDashboard size={16} strokeWidth={1.5} /> Dashboard
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => { openModal(); setOpen(false) }}
                  className="flex items-center gap-2 w-full h-[48px] px-4 text-[14px] text-primary/60 hover:text-primary active:bg-white/40 rounded-xl transition-all"
                >
                  <User size={16} strokeWidth={1.5} /> Sign In / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
