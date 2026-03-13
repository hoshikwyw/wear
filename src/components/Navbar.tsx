import { useState } from 'react'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[52px]">
        <a href="/" className="text-[20px] font-semibold tracking-[3px] text-primary">
          WEAR
        </a>

        <ul
          className={`
            flex gap-7
            max-md:fixed max-md:top-[52px] max-md:left-0 max-md:right-0 max-md:bg-white/70 max-md:backdrop-blur-2xl max-md:flex-col max-md:items-center max-md:py-8 max-md:gap-5 max-md:border-b max-md:border-white/30 max-md:transition-all max-md:duration-300
            ${mobileMenuOpen ? 'max-md:translate-y-0 max-md:opacity-100' : 'max-md:-translate-y-full max-md:opacity-0 max-md:pointer-events-none'}
          `}
        >
          {['New Arrivals', 'Categories', 'Men', 'Women', 'Unisex'].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[12px] font-normal text-primary/70 hover:text-primary transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button className="text-primary/50 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-black/5" aria-label="Search">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <button className="text-primary/50 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-black/5" aria-label="Account">
            <User size={17} strokeWidth={1.5} />
          </button>
          <button className="relative text-primary/50 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-black/5" aria-label="Cart">
            <ShoppingBag size={17} strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <button
            className="md:hidden text-primary p-1"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
