import { Heart, Eye, ShirtIcon } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  tag?: string
  colors: string[]
  category: string
}

function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/60 to-white/20">
          <ShirtIcon size={44} className="text-primary/10" strokeWidth={1} />
        </div>

        {product.tag && (
          <span className="absolute top-3 left-3 bg-white/70 backdrop-blur-xl text-primary text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-danger/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Hover actions */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${discount > 0 ? 'top-11' : ''}`}>
          <button className="w-9 h-9 bg-white/70 backdrop-blur-xl rounded-full flex items-center justify-center text-primary/50 hover:text-danger hover:bg-white/90 transition-all border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]" aria-label="Add to wishlist">
            <Heart size={15} strokeWidth={1.5} />
          </button>
          <button className="w-9 h-9 bg-white/70 backdrop-blur-xl rounded-full flex items-center justify-center text-primary/50 hover:text-accent hover:bg-white/90 transition-all border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]" aria-label="Quick view">
            <Eye size={15} strokeWidth={1.5} />
          </button>
        </div>

        {/* Add to cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button className="w-full py-3 bg-white/70 backdrop-blur-2xl text-primary text-[12px] font-medium uppercase tracking-wider rounded-xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:bg-white/90 transition-all cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        <span className="text-[11px] text-secondary uppercase tracking-wider">{product.category}</span>
        <h3 className="font-sans text-[14px] font-medium text-primary">{product.name}</h3>
        <div className="flex gap-1.5 mt-1">
          {product.colors.map((color) => (
            <span
              key={color}
              className="w-3 h-3 rounded-full border-[1.5px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] cursor-pointer hover:scale-125 transition-transform"
              style={{ background: color }}
              title={color}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[15px] font-semibold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-[13px] text-secondary line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export type { Product }
export default ProductCard
