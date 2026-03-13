import { useState } from 'react'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-light">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <a href="/" className="text-2xl font-bold tracking-[4px] text-primary">
          WEAR
        </a>

        <ul
          className={`
            flex gap-8
            max-md:fixed max-md:top-[72px] max-md:left-0 max-md:right-0 max-md:bg-white max-md:flex-col max-md:items-center max-md:py-8 max-md:gap-6 max-md:border-b max-md:border-border-custom max-md:transition-all max-md:duration-300
            ${mobileMenuOpen ? 'max-md:translate-y-0 max-md:opacity-100' : 'max-md:-translate-y-full max-md:opacity-0 max-md:pointer-events-none'}
          `}
        >
          {['New Arrivals', 'Categories', 'Men', 'Women', 'Unisex'].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-gray-500 hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-primary transition-colors p-1" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="text-gray-500 hover:text-primary transition-colors p-1" aria-label="Account">
            <User size={20} />
          </button>
          <button className="relative text-gray-500 hover:text-primary transition-colors p-1" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1.5 bg-primary text-white text-[10px] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <button
            className="md:hidden text-primary p-1"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
