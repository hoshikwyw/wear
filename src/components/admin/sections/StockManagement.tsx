import { useState } from 'react'
import { Minus, Plus, AlertTriangle } from 'lucide-react'
import type { StockMap } from '../../../types/admin'
import type { Product } from '../../../types/product'

interface Props {
  products: Product[]
  stock: StockMap
  onChange: (stock: StockMap) => void
}

function StockManagement({ products, stock, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const setQty = (productId: number, size: string, delta: number) => {
    const current = stock[productId]?.[size] ?? 0
    const next = Math.max(0, current + delta)
    onChange({
      ...stock,
      [productId]: { ...(stock[productId] ?? {}), [size]: next },
    })
  }

  const setDirect = (productId: number, size: string, value: string) => {
    const next = Math.max(0, parseInt(value) || 0)
    onChange({
      ...stock,
      [productId]: { ...(stock[productId] ?? {}), [size]: next },
    })
  }

  const totalStock = (productId: number) =>
    Object.values(stock[productId] ?? {}).reduce((a, b) => a + b, 0)

  const isLow = (productId: number) =>
    Object.values(stock[productId] ?? {}).some((q) => q <= 5)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] text-secondary">{products.length} products</p>

      {products.map((product) => {
        const expanded = expandedId === product.id
        const low = isLow(product.id)
        const total = totalStock(product.id)

        return (
          <div key={product.id} className={`bg-white/50 backdrop-blur-xl rounded-2xl border overflow-hidden transition-all ${low ? 'border-amber-200' : 'border-white/40'}`}>
            {/* Header row */}
            <button
              onClick={() => setExpandedId(expanded ? null : product.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-primary truncate">{product.name}</p>
                  {low && <AlertTriangle size={13} className="text-amber-500 flex-none" />}
                </div>
                <p className="text-[11px] text-secondary">{product.category} · {total} units total</p>
              </div>
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((c) => (
                  <span key={c} className="w-[10px] h-[10px] rounded-full border border-white/60" style={{ background: c }} />
                ))}
              </div>
              <span className={`text-[11px] transition-transform ${expanded ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {/* Expanded size grid */}
            {expanded && (
              <div className="border-t border-white/30 px-4 pb-4 pt-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const qty = stock[product.id]?.[size] ?? 0
                    const veryLow = qty <= 5
                    return (
                      <div key={size} className={`rounded-xl border p-3 ${veryLow ? 'bg-amber-50/80 border-amber-200' : 'bg-white/40 border-white/30'}`}>
                        <p className="text-[11px] font-semibold text-primary mb-2">{size}</p>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setQty(product.id, size, -1)}
                            className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary active:scale-[0.9]"
                          >
                            <Minus size={12} />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={qty}
                            onChange={(e) => setDirect(product.id, size, e.target.value)}
                            className={`flex-1 h-[30px] text-center text-[13px] font-semibold rounded-lg border bg-white/60 focus:outline-none focus:border-accent/40 transition-all ${veryLow ? 'text-amber-700 border-amber-200' : 'text-primary border-white/40'}`}
                          />
                          <button
                            onClick={() => setQty(product.id, size, 1)}
                            className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary active:scale-[0.9]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        {veryLow && <p className="text-[10px] text-amber-600 mt-1 text-center">Low stock</p>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StockManagement
