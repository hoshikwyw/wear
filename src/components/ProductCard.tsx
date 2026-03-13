import { Heart } from 'lucide-react'
import type { Product } from '../types/product'
import GarmentRenderer from './garments/GarmentRenderer'

interface Props {
  product: Product
  onSelect?: (product: Product) => void
}

function ProductCard({ product, onSelect }: Props) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="flex flex-col">
      {/* Image */}
      <div
        className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] cursor-pointer"
        onClick={() => onSelect?.(product)}
      >
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/60 to-white/20 p-6 sm:p-8">
          <GarmentRenderer
            type={product.garmentType}
            color={product.colors[0]}
            className="w-full h-full drop-shadow-sm"
          />
        </div>

        {/* Tag */}
        {product.tag && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/70 backdrop-blur-xl text-primary text-[9px] sm:text-[10px] font-medium uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/50">
            {product.tag}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-danger/90 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Wishlist — always visible, 44px touch target */}
        {!(discount > 0) && (
          <button
            className="absolute top-1 right-1 sm:top-2 sm:right-2 w-[40px] h-[40px] sm:w-[36px] sm:h-[36px] flex items-center justify-center rounded-full bg-white/50 sm:bg-white/60 backdrop-blur-xl text-primary/30 active:text-danger sm:hover:text-danger border border-white/40 transition-all"
            aria-label="Add to wishlist"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart size={16} strokeWidth={1.5} />
          </button>
        )}

        {/* Add to cart — always visible on mobile */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
          <button
            className="w-full h-[44px] sm:h-[40px] bg-white/65 backdrop-blur-2xl text-primary text-[12px] sm:text-[12px] font-medium uppercase tracking-wider rounded-lg sm:rounded-xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.06)] active:scale-[0.97] sm:hover:bg-white/85 transition-all cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 sm:gap-1 px-0.5 cursor-pointer" onClick={() => onSelect?.(product)}>
        <span className="text-[10px] sm:text-[11px] text-secondary uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-sans text-[13px] sm:text-[14px] font-medium text-primary leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex gap-1.5 mt-1">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-[1.5px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
              style={{ background: color }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px] sm:text-[15px] font-semibold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-[12px] sm:text-[13px] text-secondary line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
