import { useState } from 'react'
import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import type { Product } from '../types/product'
import type { AdminCategory } from '../types/admin'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
  categories: AdminCategory[]
  initialCategory?: string
  onBack: () => void
  onSelectProduct: (product: Product) => void
}

function AllProducts({ products, categories, initialCategory, onBack, onSelectProduct }: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'All')
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest')
  const [showSort, setShowSort] = useState(false)

  const categoryNames = ['All', ...categories.map((c) => c.name)]

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0
  })

  return (
    <div className="min-h-[100dvh] bg-[#f2f0ed]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[860px] mx-auto flex items-center justify-between h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <button
            onClick={onBack}
            className="w-[44px] h-[44px] flex items-center justify-center -ml-2 text-primary active:scale-[0.95] transition-transform"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-[13px] font-medium text-primary">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
          </span>
          <button
            onClick={() => setShowSort(!showSort)}
            className={`w-[44px] h-[44px] flex items-center justify-center -mr-2 transition-colors active:scale-[0.95] ${showSort ? 'text-accent' : 'text-secondary'}`}
            aria-label="Sort"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-8">
        {/* Category filter chips */}
        <div
          className="flex gap-2 overflow-x-auto pb-3 pt-2 -mx-4 px-4 snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none snap-start h-[40px] px-4 rounded-full text-[13px] font-medium border transition-all active:scale-[0.95] ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white/50 backdrop-blur-xl text-primary border-white/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        {showSort && (
          <div className="flex gap-2 pb-3">
            {[
              { key: 'newest' as const, label: 'Newest' },
              { key: 'price-low' as const, label: 'Price: Low' },
              { key: 'price-high' as const, label: 'Price: High' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setSortBy(opt.key); setShowSort(false) }}
                className={`h-[36px] px-3 rounded-lg text-[12px] font-medium border transition-all active:scale-[0.95] ${
                  sortBy === opt.key
                    ? 'bg-accent/10 text-accent-dark border-accent/20'
                    : 'bg-white/40 text-secondary border-white/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <p className="text-[12px] text-secondary mb-4">
          {sorted.length} {sorted.length === 1 ? 'product' : 'products'}
        </p>

        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[15px] text-secondary">No products in this category yet.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 h-[44px] px-6 rounded-full text-[13px] font-medium bg-white/55 backdrop-blur-xl border border-white/40 text-primary active:scale-[0.97] transition-all"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProducts
