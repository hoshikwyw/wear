import { Check } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../types/product'
import GarmentRenderer from './garments/GarmentRenderer'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
  onSelect?: (product: Product) => void
}

function ProductCard({ product, onSelect }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const remaining = product.preOrderLimit - product.preOrderTaken
  const isSoldOut = remaining <= 0
  const isLowStock = remaining > 0 && remaining <= 10
  const pctFilled = product.preOrderLimit > 0
    ? Math.min(100, (product.preOrderTaken / product.preOrderLimit) * 100)
    : 100

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handlePreOrder = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isSoldOut) return
    addItem(product, product.sizes[0], product.colors[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="flex flex-col">
      {/* Image */}
      <div
        className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] cursor-pointer"
        onClick={() => onSelect?.(product)}
      >
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-white/60 to-white/20 p-6 sm:p-8 transition-opacity ${isSoldOut ? 'opacity-40' : ''}`}>
          <GarmentRenderer
            type={product.garmentType}
            color={product.colors[0]}
            className="w-full h-full drop-shadow-sm"
          />
        </div>

        {/* Sold out overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="bg-primary/90 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full border border-white/20">
              Sold Out
            </span>
          </div>
        )}

        {/* Low stock badge — takes priority over tag */}
        {isLowStock && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Only {remaining} left!
          </span>
        )}

        {/* Tag */}
        {!isLowStock && product.tag && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/70 backdrop-blur-xl text-primary text-[9px] sm:text-[10px] font-medium uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/50">
            {product.tag}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && !isSoldOut && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-danger/90 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* CTA */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
          <button
            className={`w-full h-[44px] sm:h-[40px] backdrop-blur-2xl text-[12px] font-medium uppercase tracking-wider rounded-lg sm:rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all flex items-center justify-center gap-1.5 ${
              isSoldOut
                ? 'bg-white/30 border-white/20 text-secondary/50 cursor-not-allowed'
                : added
                ? 'bg-green-500/80 border-green-400/50 text-white active:scale-[0.97] cursor-pointer'
                : 'bg-white/65 border-white/50 text-primary sm:hover:bg-white/85 active:scale-[0.97] cursor-pointer'
            }`}
            onClick={handlePreOrder}
            disabled={isSoldOut}
          >
            {isSoldOut
              ? 'Sold Out'
              : added
              ? <><Check size={13} strokeWidth={2.5} /> Added</>
              : 'Pre-Order'}
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

        {/* Pre-order availability bar */}
        <div className="mt-2">
          <span className={`text-[10px] font-medium ${isSoldOut ? 'text-secondary/60' : isLowStock ? 'text-amber-600' : 'text-secondary'}`}>
            {isSoldOut ? 'All units reserved' : `${remaining} of ${product.preOrderLimit} available`}
          </span>
          <div className="h-[3px] bg-black/5 rounded-full overflow-hidden mt-1">
            <div
              className={`h-full rounded-full transition-all ${isSoldOut ? 'bg-secondary/40 w-full' : isLowStock ? 'bg-amber-500' : 'bg-accent'}`}
              style={{ width: `${pctFilled}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
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
