import { useState } from 'react'
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Navbar() {
  const [open, setOpen] = useState(false)
  const { count, openCart } = useCart()

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
            <button className="w-[44px] h-[44px] flex items-center justify-center text-primary/35 hover:text-primary/70 rounded-xl hover:bg-white/40 active:bg-white/50 transition-all" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:flex w-[44px] h-[44px] items-center justify-center text-primary/35 hover:text-primary/70 rounded-xl hover:bg-white/40 transition-all" aria-label="Account">
              <User size={18} strokeWidth={1.5} />
            </button>
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
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
