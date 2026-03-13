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
      <div className="relative aspect-[3/4] bg-surface rounded overflow-hidden mb-4">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-border-light to-border-custom">
          <ShirtIcon size={48} className="text-muted/30" strokeWidth={1} />
        </div>

        {product.tag && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-danger text-white text-[11px] font-semibold px-2 py-1 rounded-sm">
            -{discount}%
          </span>
        )}

        {/* Hover actions */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${discount > 0 ? 'top-11' : ''}`}>
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:bg-primary hover:text-white transition-all" aria-label="Add to wishlist">
            <Heart size={16} />
          </button>
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:bg-primary hover:text-white transition-all" aria-label="Quick view">
            <Eye size={16} />
          </button>
        </div>

        {/* Add to cart */}
        <button className="absolute bottom-0 left-0 right-0 py-3.5 bg-primary text-white text-[13px] font-medium uppercase tracking-wider opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-accent-dark cursor-pointer">
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-muted uppercase tracking-wider">{product.category}</span>
        <h3 className="font-sans text-[15px] font-medium text-primary">{product.name}</h3>
        <div className="flex gap-1.5 mt-0.5">
          {product.colors.map((color) => (
            <span
              key={color}
              className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-[0_0_0_1px] shadow-border-custom cursor-pointer hover:scale-[1.2] transition-transform"
              style={{ background: color }}
              title={color}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-semibold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export type { Product }
export default ProductCard
