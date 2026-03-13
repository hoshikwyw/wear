import { Instagram, Twitter, Facebook } from 'lucide-react'

const shopLinks = ['T-Shirts', 'Hoodies', 'Tops', 'Sweatshirts']
const helpLinks = ['Contact', 'Shipping', 'Size Guide', 'FAQs']

function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-2xl border-t border-white/40 pt-10 sm:pt-14 lg:pt-16 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-8 sm:gap-10 lg:gap-12 pb-8 sm:pb-12">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="font-sans text-[18px] sm:text-[20px] font-semibold tracking-[3px] text-primary mb-3">
              WEAR
            </h3>
            <p className="text-[13px] text-secondary leading-relaxed mb-5 max-w-[280px] mx-auto sm:mx-0">
              Premium clothing for every style and every body.
            </p>
            <div className="flex gap-2 justify-center sm:justify-start">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-[44px] h-[44px] sm:w-[38px] sm:h-[38px] rounded-full bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-secondary active:text-primary sm:hover:text-primary sm:hover:bg-white/80 transition-all"
                  aria-label={label}
                >
                  <Icon size={18} className="sm:w-4 sm:h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — side by side on mobile */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            <LinkColumn title="Shop" links={shopLinks} />
            <LinkColumn title="Help" links={helpLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 border-t border-black/5 text-[11px] sm:text-[12px] text-secondary text-center">
          <p>&copy; 2026 WEAR. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="active:text-primary sm:hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="active:text-primary sm:hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="text-center sm:text-left">
      <h4 className="font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-primary mb-4">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5 sm:gap-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-[13px] text-secondary active:text-primary sm:hover:text-primary transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
