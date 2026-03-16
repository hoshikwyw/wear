import { useState } from 'react'
import { ArrowLeft, Heart, Minus, Plus, Sparkles, Check } from 'lucide-react'
import type { Product } from '../types/product'
import GarmentRenderer from './garments/GarmentRenderer'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
  onBack: () => void
  onCustomize: (product: Product) => void
}

function ProductDetails({ product, onBack, onCustomize }: Props) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 1200)
      return
    }
    addItem(product, selectedSize, selectedColor, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

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
          <span className="text-[13px] font-medium text-primary truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
          <button
            className="w-[44px] h-[44px] flex items-center justify-center -mr-2 text-primary/40 active:text-danger transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pb-28">
        <div className="sm:grid sm:grid-cols-2 sm:gap-8 lg:gap-12">
          {/* Garment preview */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] mb-6 sm:mb-0 sm:sticky sm:top-20">
            <div className="w-full h-full flex items-center justify-center p-10 sm:p-14">
              <GarmentRenderer
                type={product.garmentType}
                color={selectedColor}
                className="w-full h-full drop-shadow-md"
              />
            </div>
            {product.tag && (
              <span className="absolute top-3 left-3 bg-white/70 backdrop-blur-xl text-primary text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/50">
                {product.tag}
              </span>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-5">
            {/* Title & price */}
            <div>
              <span className="text-[11px] text-secondary uppercase tracking-wider">{product.category}</span>
              <h1 className="text-[22px] sm:text-[26px] font-semibold text-primary leading-tight mt-1">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[22px] font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-[16px] text-secondary line-through">${product.originalPrice}</span>
                    <span className="text-[12px] font-semibold text-danger bg-danger/10 px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[14px] sm:text-[15px] text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Color picker */}
            <div>
              <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Color</span>
              <div className="flex gap-3 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-[40px] h-[40px] rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-accent scale-110 shadow-[0_0_0_2px_rgba(176,137,104,0.3)]'
                        : 'border-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]'
                    }`}
                    style={{ background: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Size</span>
                {sizeError && <span className="text-[11px] text-danger font-medium animate-pulse">Please select a size</span>}
              </div>
              <div className={`flex flex-wrap gap-2 mt-2 transition-all ${sizeError ? 'ring-2 ring-danger/30 rounded-xl p-2 -m-2' : ''}`}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={`h-[44px] min-w-[50px] px-4 rounded-xl text-[13px] font-medium border transition-all active:scale-[0.95] ${
                      selectedSize === size
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white/50 backdrop-blur-xl text-primary border-white/40 hover:bg-white/70'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/40 backdrop-blur-xl rounded-xl p-3 border border-white/30">
                <span className="text-[10px] text-secondary uppercase tracking-wider">Material</span>
                <p className="text-[13px] font-medium text-primary mt-0.5">{product.material}</p>
              </div>
              <div className="bg-white/40 backdrop-blur-xl rounded-xl p-3 border border-white/30">
                <span className="text-[10px] text-secondary uppercase tracking-wider">Fit</span>
                <p className="text-[13px] font-medium text-primary mt-0.5">{product.fit}</p>
              </div>
            </div>

            {/* Customize button */}
            {product.customizable && (
              <button
                onClick={() => onCustomize(product)}
                className="flex items-center justify-center gap-2 h-[50px] rounded-xl bg-accent/10 backdrop-blur-xl border border-accent/20 text-accent-dark text-[13px] font-semibold uppercase tracking-wider active:scale-[0.97] transition-all"
              >
                <Sparkles size={16} />
                Customize This Product
              </button>
            )}

            {/* Quantity — visible on desktop, on mobile it's in the sticky bar */}
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Qty</span>
              <div className="flex items-center bg-white/50 backdrop-blur-xl rounded-xl border border-white/40">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-[44px] h-[44px] flex items-center justify-center text-primary active:scale-[0.9] transition-transform"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-[14px] font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-[44px] h-[44px] flex items-center justify-center text-primary active:scale-[0.9] transition-transform"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Desktop add to cart */}
            <button
              onClick={handleAddToCart}
              className={`hidden sm:flex items-center justify-center gap-2 h-[52px] text-[14px] font-semibold uppercase tracking-wider rounded-xl active:scale-[0.97] transition-all ${added ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-light'}`}
            >
              {added ? <><Check size={16} strokeWidth={2.5} /> Added to Cart</> : `Add to Cart — $${product.price * qty}`}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden px-4 pb-4 pt-2">
        <div className="flex items-center gap-3 p-2 bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
          {/* Qty */}
          <div className="flex items-center bg-white/60 rounded-xl border border-white/40">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-[40px] h-[44px] flex items-center justify-center text-primary active:scale-[0.9]"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-[13px] font-medium">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-[40px] h-[44px] flex items-center justify-center text-primary active:scale-[0.9]"
            >
              <Plus size={14} />
            </button>
          </div>
          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-[48px] text-[13px] font-semibold uppercase tracking-wider rounded-xl active:scale-[0.97] transition-all flex items-center justify-center gap-2 ${added ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}
          >
            {added ? <><Check size={14} strokeWidth={2.5} /> Added!</> : `Add to Cart — $${product.price * qty}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
