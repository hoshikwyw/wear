import { Instagram, Twitter, Facebook } from 'lucide-react'

const shopLinks = ['T-Shirts', 'Hoodies', 'Tops & Blouses', 'Sweatshirts', 'New Arrivals']
const companyLinks = ['About Us', 'Careers', 'Sustainability', 'Press']
const helpLinks = ['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQs']

function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-2xl border-t border-white/40 pt-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] max-md:grid-cols-2 gap-12 max-md:gap-8 pb-12">
          {/* Brand */}
          <div className="max-md:col-span-2">
            <h3 className="font-sans text-[20px] font-semibold tracking-[3px] text-primary mb-4">
              WEAR
            </h3>
            <p className="text-[13px] text-secondary leading-relaxed mb-5 max-w-[280px]">
              Premium clothing for every style and every body. T-shirts, hoodies, and top-wear crafted with care.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-secondary hover:text-primary hover:bg-white/80 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Shop" links={shopLinks} />
          <LinkColumn title="Company" links={companyLinks} />
          <LinkColumn title="Help" links={helpLinks} />
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between py-6 border-t border-black/5 text-[12px] text-secondary max-md:flex-col max-md:gap-3 max-md:text-center">
          <p>&copy; 2026 WEAR. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-sans text-[12px] font-semibold uppercase tracking-wider text-primary mb-5">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-[13px] text-secondary hover:text-primary transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
