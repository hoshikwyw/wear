import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CartDrawer() {
  const { items, count, total, isOpen, closeCart, openCheckout, removeItem, updateQty, clearCart } = useCart()
  const { user, openModal } = useAuth()

  const handleCheckout = () => {
    if (!user) {
      closeCart()
      openModal(() => openCheckout())
    } else {
      openCheckout()
    }
  }

  const freeShippingThreshold = 100
  const remaining = freeShippingThreshold - total

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[420px] flex flex-col bg-[#f5f4f1]/90 backdrop-blur-2xl border-l border-white/40 shadow-[-8px_0_40px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-black/5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-primary" />
            <span className="text-[15px] font-semibold text-primary">
              Cart {count > 0 && <span className="text-secondary font-normal">({count})</span>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-secondary hover:text-danger transition-colors px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={closeCart}
              className="w-[36px] h-[36px] flex items-center justify-center rounded-xl bg-white/60 border border-white/40 text-secondary hover:text-primary transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <div className="w-[64px] h-[64px] bg-white/50 rounded-2xl flex items-center justify-center mb-4 border border-white/40">
                <ShoppingBag size={28} className="text-secondary/40" strokeWidth={1} />
              </div>
              <p className="text-[15px] font-medium text-primary mb-1">Your cart is empty</p>
              <p className="text-[13px] text-secondary">Add something to get started</p>
              <button
                onClick={closeCart}
                className="mt-6 h-[44px] px-6 rounded-full bg-white/60 border border-white/40 text-[13px] font-medium text-primary active:scale-[0.97] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping progress */}
              {remaining > 0 ? (
                <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 px-4 py-3">
                  <p className="text-[12px] text-secondary mb-2">
                    Add <span className="font-semibold text-primary">${remaining.toFixed(0)}</span> more for free shipping
                  </p>
                  <div className="h-[4px] bg-white/60 rounded-full overflow-hidden border border-white/30">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-green-50/80 rounded-2xl border border-green-100 px-4 py-2.5 text-center">
                  <p className="text-[12px] font-medium text-green-700">🎉 You qualify for free shipping!</p>
                </div>
              )}

              {/* Cart items */}
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-white/55 backdrop-blur-xl rounded-2xl border border-white/40 p-3">
                  {/* Color swatch as thumbnail */}
                  <div
                    className="w-[64px] h-[64px] rounded-xl flex-none border-2 border-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${item.color}cc, ${item.color})` }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        {item.isCustom && (
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-accent-dark bg-accent/10 px-1.5 py-0.5 rounded-full border border-accent/20 mb-1 inline-block">
                            Custom
                          </span>
                        )}
                        <p className="text-[13px] font-medium text-primary leading-snug truncate">{item.product.name}</p>
                        <p className="text-[11px] text-secondary mt-0.5">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-[28px] h-[28px] flex items-center justify-center rounded-lg text-secondary hover:text-danger transition-colors flex-none"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Qty + price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white/60 rounded-lg border border-white/40">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-[30px] h-[30px] flex items-center justify-center text-secondary active:scale-[0.9] transition-transform"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-[13px] font-semibold text-primary">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-[30px] h-[30px] flex items-center justify-center text-secondary active:scale-[0.9] transition-transform"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[14px] font-semibold text-primary">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div className="px-4 pb-6 pt-3 border-t border-black/5 flex flex-col gap-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-secondary">Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
              <span className="font-semibold text-primary">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-secondary">Shipping</span>
              <span className={total >= freeShippingThreshold ? 'text-green-600 font-medium' : 'text-secondary'}>
                {total >= freeShippingThreshold ? 'Free' : `$${(5.99).toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-[15px] font-semibold text-primary border-t border-black/5 pt-3">
              <span>Total</span>
              <span>${(total >= freeShippingThreshold ? total : total + 5.99).toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className="h-[52px] bg-primary text-white text-[14px] font-semibold rounded-xl active:scale-[0.97] hover:bg-primary-light transition-all mt-1">
              Checkout
            </button>
            <button onClick={closeCart} className="h-[44px] bg-white/50 border border-white/40 text-primary text-[13px] font-medium rounded-xl active:scale-[0.97] transition-all">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
