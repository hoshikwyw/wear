import { Sparkles } from 'lucide-react'
import { products } from '../data/products'
import type { Product } from '../types/product'

interface Props {
  onCustomize?: (product: Product) => void
}

function CustomDesignBanner({ onCustomize }: Props) {
  const handleTry = () => {
    const customizable = products.find((p) => p.customizable)
    if (customizable && onCustomize) onCustomize(customizable)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary-light to-[#3a3632] px-6 py-10 sm:p-10 lg:p-14 text-center sm:text-left">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[250px] sm:w-[400px] aspect-square rounded-full bg-gradient-to-br from-amber-400/10 to-orange-300/8 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] aspect-square rounded-full bg-gradient-to-br from-rose-400/8 to-amber-300/8 blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 max-w-[480px] sm:max-w-none mx-auto">
            {/* Tag */}
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium tracking-[2px] uppercase text-accent-light mb-4 sm:mb-5 px-3 sm:px-4 py-1.5 rounded-full bg-white/8 backdrop-blur-md border border-white/10">
              <Sparkles size={12} />
              Try It Now
            </span>

            <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[38px] font-semibold text-white tracking-tight mb-3 sm:mb-4">
              Design Your Own
            </h2>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/55 mb-6 sm:mb-8 font-light max-w-[400px] mx-auto sm:mx-0">
              Custom prints, colors, and text on any garment. Make it uniquely yours.
            </p>

            {/* Large CTA */}
            <button
              onClick={handleTry}
              className="w-full sm:w-auto inline-flex items-center justify-center h-[50px] sm:h-[44px] px-7 text-[14px] sm:text-[13px] font-medium bg-accent text-white rounded-full active:scale-[0.97] sm:hover:bg-accent-dark transition-all shadow-[0_4px_16px_rgba(176,137,104,0.25)] cursor-pointer"
            >
              Start Customizing
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomDesignBanner
