import ProductCard from './ProductCard'
import type { Product } from '../types/product'

interface Props {
  products: Product[]
  loading: boolean
  onSelectProduct?: (product: Product) => void
  onViewAll?: () => void
}

function FeaturedProducts({ products, loading, onSelectProduct, onViewAll }: Props) {
  return (
    <section className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:py-24 px-4 sm:px-6" id="new-arrivals">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <h2 className="font-display text-[24px] sm:text-[28px] lg:text-[34px] font-semibold text-primary tracking-tight mb-2">
            New Arrivals
          </h2>
          <p className="text-secondary text-[14px] sm:text-[16px] font-light">
            Fresh styles, just dropped
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-white/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:mt-14 px-4 sm:px-0">
          <button
            onClick={onViewAll}
            className="inline-flex items-center justify-center w-full sm:w-auto h-[50px] sm:h-[46px] px-8 text-[14px] sm:text-[13px] font-medium text-primary bg-white/55 backdrop-blur-xl border border-white/40 rounded-full active:scale-[0.97] sm:hover:bg-white/75 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
