import { useState, useRef, useEffect } from 'react'
import {
  Search, ShoppingBag, Menu, X, User, LogOut, ChevronDown,
  LayoutDashboard, CircleUserRound,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import type { Product } from '../types/product'
import GarmentRenderer from './garments/GarmentRenderer'

interface Props {
  onAdminAccess?: () => void
  onOpenProfile?: () => void
  onViewAll?: () => void
  onSelectProduct?: (p: Product) => void
  products?: Product[]
}

const navLinks: { label: string; scroll?: string; all?: true }[] = [
  { label: 'New Arrivals', scroll: 'new-arrivals' },
  { label: 'Categories',   scroll: 'categories'   },
  { label: 'Men',          all: true },
  { label: 'Women',        all: true },
  { label: 'Unisex',       all: true },
]

function Navbar({ onAdminAccess, onOpenProfile, onViewAll, onSelectProduct, products = [] }: Props) {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [userMenu,   setUserMenu]     = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [query,      setQuery]        = useState('')

  const menuRef       = useRef<HTMLDivElement>(null)
  const searchPanelRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { count, openCart } = useCart()
  const { user, openModal, logout } = useAuth()

  // Close user-menu on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenu(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Close search on outside click or Escape
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(e.target as Node)) closeSearch()
    }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch() }
    if (searchOpen) {
      document.addEventListener('mousedown', click)
      document.addEventListener('keydown', key)
    }
    return () => {
      document.removeEventListener('mousedown', click)
      document.removeEventListener('keydown', key)
    }
  }, [searchOpen])

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [searchOpen])

  const closeSearch = () => { setSearchOpen(false); setQuery('') }

  const results: Product[] = query.trim().length >= 1
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : []

  const handleNav = (link: typeof navLinks[number]) => {
    setMobileOpen(false)
    if (link.scroll) {
      document.getElementById(link.scroll)?.scrollIntoView({ behavior: 'smooth' })
    } else if (link.all) {
      onViewAll?.()
    }
  }

  const handleResult = (p: Product) => {
    closeSearch()
    onSelectProduct?.(p)
  }

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-2 sm:px-4 sm:pt-3">
        <nav className="mx-auto w-full max-w-[860px] bg-white/50 backdrop-blur-2xl backdrop-saturate-150 rounded-xl sm:rounded-2xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]">
          {/* Main bar */}
          <div className="flex items-center justify-between h-[48px] px-4 sm:px-5">
            {/* Logo */}
            <button
              onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="text-[15px] sm:text-[16px] font-semibold tracking-[3px] text-primary/85"
            >
              WEAR
            </button>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link)}
                    className="text-[12px] font-medium text-primary/45 hover:text-primary hover:bg-white/50 px-3 py-1.5 rounded-lg transition-all"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center">
              {/* Search button */}
              <button
                onClick={() => { setSearchOpen((v) => !v); setQuery('') }}
                className={`w-[44px] h-[44px] flex items-center justify-center rounded-xl hover:bg-white/40 active:bg-white/50 transition-all ${searchOpen ? 'text-primary' : 'text-primary/35 hover:text-primary/70'}`}
                aria-label="Search"
              >
                {searchOpen ? <X size={18} strokeWidth={1.5} /> : <Search size={18} strokeWidth={1.5} />}
              </button>

              {/* User button — desktop */}
              <div ref={menuRef} className="relative hidden sm:block">
                {user ? (
                  <button
                    onClick={() => setUserMenu((v) => !v)}
                    className="flex items-center gap-1.5 h-[44px] px-2 text-primary/70 hover:text-primary rounded-xl hover:bg-white/40 transition-all"
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
                    <button
                      onClick={() => { setUserMenu(false); onOpenProfile?.() }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-primary hover:bg-black/5 transition-colors border-b border-black/5"
                    >
                      <CircleUserRound size={14} /> My Account
                    </button>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => { setUserMenu(false); onAdminAccess?.() }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-primary hover:bg-black/5 transition-colors border-b border-black/5"
                      >
                        <LayoutDashboard size={14} /> Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => { logout(); setUserMenu(false) }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-danger hover:bg-danger/5 transition-colors"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
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

              {/* Mobile menu toggle */}
              <button
                className="md:hidden w-[44px] h-[44px] flex items-center justify-center text-primary/50 rounded-xl hover:bg-white/40 active:bg-white/50 transition-all"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-black/5 px-2 py-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  className="flex items-center w-full h-[48px] px-4 text-[15px] text-primary/60 hover:text-primary active:bg-white/40 rounded-xl transition-all"
                >
                  {link.label}
                </button>
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
                      <button onClick={() => { logout(); setMobileOpen(false) }} className="flex items-center gap-1.5 text-[13px] text-danger">
                        <LogOut size={14} /> Sign out
                      </button>
                    </div>
                    <button
                      onClick={() => { setMobileOpen(false); onOpenProfile?.() }}
                      className="flex items-center gap-2 w-full h-[48px] px-4 text-[14px] text-primary/70 hover:text-primary active:bg-white/40 rounded-xl transition-all"
                    >
                      <CircleUserRound size={16} strokeWidth={1.5} /> My Account
                    </button>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => { setMobileOpen(false); onAdminAccess?.() }}
                        className="flex items-center gap-2 w-full h-[48px] px-4 text-[14px] text-primary/70 hover:text-primary active:bg-white/40 rounded-xl transition-all"
                      >
                        <LayoutDashboard size={16} strokeWidth={1.5} /> Dashboard
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => { openModal(); setMobileOpen(false) }}
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

      {/* ── Search overlay ── */}
      {searchOpen && (
        <>
          <div className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-[2px]" />
          <div ref={searchPanelRef} className="fixed top-[66px] sm:top-[72px] inset-x-3 sm:inset-x-4 z-[60] max-w-[600px] mx-auto">
            <div className="bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.14)] overflow-hidden">
              {/* Input row */}
              <div className="flex items-center gap-3 px-4 h-[52px] border-b border-black/5">
                <Search size={16} className="text-secondary flex-none" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories…"
                  className="flex-1 text-[14px] text-primary bg-transparent outline-none placeholder:text-secondary/50"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-secondary hover:text-primary transition-colors">
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="py-1 max-h-[60vh] overflow-y-auto">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleResult(p)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/[0.04] active:bg-black/[0.07] transition-colors text-left"
                    >
                      <div className="w-[44px] h-[44px] bg-white rounded-xl border border-black/5 flex items-center justify-center flex-none p-2">
                        <GarmentRenderer type={p.garmentType} color={p.colors[0]} className="w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-primary truncate">{p.name}</p>
                        <p className="text-[11px] text-secondary">{p.category} · ${p.price}</p>
                      </div>
                      <div className="flex gap-1 flex-none">
                        {p.colors.slice(0, 3).map((c) => (
                          <span key={c} className="w-[8px] h-[8px] rounded-full border border-black/10" style={{ background: c }} />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No results */}
              {query.trim().length >= 1 && results.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-[13px] text-secondary">No products found for <span className="font-medium text-primary">"{query}"</span></p>
                </div>
              )}

              {/* Hint when empty */}
              {query.trim().length === 0 && (
                <div className="py-6 px-4">
                  <p className="text-[12px] text-secondary/70 text-center">Type to search through {products.length} products</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar
