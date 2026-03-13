import { useState } from 'react'
import { ArrowLeft, Type, Palette, RotateCcw, ShoppingBag } from 'lucide-react'
import type { Product } from '../types/product'
import GarmentRenderer from './garments/GarmentRenderer'

interface Props {
  product: Product
  onBack: () => void
}

const presetColors = [
  '#1a1a1a', '#ffffff', '#c9a87c', '#b08968', '#8b4513',
  '#6b8e8e', '#4a5568', '#8fbc8f', '#d2b48c', '#b0c4de',
  '#f5c6d0', '#a8d8ea', '#8b0000', '#2d5016', '#1e3a5f',
  '#7b2d8b', '#d4a017', '#ff6b35',
]

const textSizeOptions = [
  { label: 'S', value: 'sm' as const },
  { label: 'M', value: 'md' as const },
  { label: 'L', value: 'lg' as const },
]

type Tab = 'color' | 'text'

function ProductCustomizer({ product, onBack }: Props) {
  const [garmentColor, setGarmentColor] = useState(product.colors[0])
  const [overlayText, setOverlayText] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [activeTab, setActiveTab] = useState<Tab>('color')

  const handleReset = () => {
    setGarmentColor(product.colors[0])
    setOverlayText('')
    setTextColor('#ffffff')
    setTextSize('md')
  }

  return (
    <div className="min-h-[100dvh] bg-[#f2f0ed] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-30 px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[860px] mx-auto flex items-center justify-between h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <button
            onClick={onBack}
            className="w-[44px] h-[44px] flex items-center justify-center -ml-2 text-primary active:scale-[0.95] transition-transform"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-[13px] font-medium text-primary">Customize</span>
          <button
            onClick={handleReset}
            className="w-[44px] h-[44px] flex items-center justify-center -mr-2 text-secondary active:scale-[0.95] transition-transform"
            aria-label="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-[860px] mx-auto w-full px-4 sm:px-6">
        <div className="sm:grid sm:grid-cols-2 sm:gap-8 lg:gap-12 h-full">
          {/* Live preview */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] mb-4 sm:mb-0 sm:sticky sm:top-20">
            <div className="w-full h-full flex items-center justify-center p-10 sm:p-14">
              <GarmentRenderer
                type={product.garmentType}
                color={garmentColor}
                overlayText={overlayText || undefined}
                textColor={textColor}
                textSize={textSize}
                className="w-full h-full drop-shadow-md"
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-[11px] text-secondary bg-white/60 backdrop-blur-xl px-3 py-1 rounded-full border border-white/40">
                Live Preview
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4 pb-28 sm:pb-8">
            {/* Product name */}
            <div>
              <span className="text-[11px] text-secondary uppercase tracking-wider">{product.category}</span>
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-primary leading-tight mt-0.5">
                {product.name}
              </h2>
            </div>

            {/* Tab switcher */}
            <div className="flex bg-white/40 backdrop-blur-xl rounded-xl border border-white/30 p-1">
              <button
                onClick={() => setActiveTab('color')}
                className={`flex-1 flex items-center justify-center gap-2 h-[44px] rounded-lg text-[13px] font-medium transition-all ${
                  activeTab === 'color'
                    ? 'bg-white/70 text-primary shadow-sm'
                    : 'text-secondary'
                }`}
              >
                <Palette size={16} />
                Color
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 flex items-center justify-center gap-2 h-[44px] rounded-lg text-[13px] font-medium transition-all ${
                  activeTab === 'text'
                    ? 'bg-white/70 text-primary shadow-sm'
                    : 'text-secondary'
                }`}
              >
                <Type size={16} />
                Text
              </button>
            </div>

            {/* Color tab */}
            {activeTab === 'color' && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Garment Color</span>
                  <div className="grid grid-cols-6 gap-2.5 mt-3">
                    {presetColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setGarmentColor(color)}
                        className={`aspect-square rounded-xl border-2 transition-all active:scale-[0.9] ${
                          garmentColor === color
                            ? 'border-accent scale-105 shadow-[0_0_0_2px_rgba(176,137,104,0.3)]'
                            : 'border-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]'
                        }`}
                        style={{ background: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom color */}
                <div>
                  <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Custom Color</span>
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="color"
                      value={garmentColor}
                      onChange={(e) => setGarmentColor(e.target.value)}
                      className="w-[48px] h-[48px] rounded-xl border-2 border-white cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                    />
                    <span className="text-[13px] text-secondary font-mono uppercase">{garmentColor}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Text tab */}
            {activeTab === 'text' && (
              <div className="flex flex-col gap-4">
                {/* Text input */}
                <div>
                  <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Your Text</span>
                  <input
                    type="text"
                    value={overlayText}
                    onChange={(e) => setOverlayText(e.target.value.slice(0, 20))}
                    placeholder="Type something..."
                    maxLength={20}
                    className="mt-2 w-full h-[48px] bg-white/50 backdrop-blur-xl rounded-xl border border-white/40 px-4 text-[14px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                  <span className="text-[11px] text-secondary mt-1 block text-right">{overlayText.length}/20</span>
                </div>

                {/* Text color */}
                <div>
                  <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Text Color</span>
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    {['#ffffff', '#1a1a1a', '#b08968', '#c0392b', '#2d5016', '#1e3a5f'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setTextColor(color)}
                        className={`w-[40px] h-[40px] rounded-xl border-2 transition-all active:scale-[0.9] ${
                          textColor === color
                            ? 'border-accent scale-105 shadow-[0_0_0_2px_rgba(176,137,104,0.3)]'
                            : 'border-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]'
                        }`}
                        style={{ background: color }}
                        aria-label={`Text color ${color}`}
                      />
                    ))}
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-[40px] h-[40px] rounded-xl border-2 border-white cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>

                {/* Text size */}
                <div>
                  <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Text Size</span>
                  <div className="flex gap-2 mt-2">
                    {textSizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTextSize(opt.value)}
                        className={`h-[44px] w-[56px] rounded-xl text-[13px] font-medium border transition-all active:scale-[0.95] ${
                          textSize === opt.value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white/50 backdrop-blur-xl text-primary border-white/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2">
        <div className="max-w-[860px] mx-auto flex items-center gap-3 p-2 bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col px-3">
            <span className="text-[10px] text-secondary uppercase tracking-wider">Total</span>
            <span className="text-[18px] font-bold text-primary">${product.price}</span>
          </div>
          <button className="flex-1 flex items-center justify-center gap-2 h-[48px] bg-primary text-white text-[13px] font-semibold uppercase tracking-wider rounded-xl active:scale-[0.97] transition-transform">
            <ShoppingBag size={16} />
            Add Custom to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCustomizer
