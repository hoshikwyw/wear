import { createContext, useContext, useState } from 'react'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  isCheckoutOpen: boolean
  openCart: () => void
  closeCart: () => void
  openCheckout: () => void
  closeCheckout: () => void
  addItem: (product: Product, size: string, color: string, qty?: number, isCustom?: boolean) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  const addItem = (product: Product, size: string, color: string, qty = 1, isCustom = false) => {
    const id = isCustom
      ? `custom-${Date.now()}`
      : `${product.id}-${size}-${color}`

    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing && !isCustom) {
        return prev.map((i) => i.id === id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { id, product, size, color, qty, isCustom }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id)
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const openCheckout = () => { setIsOpen(false); setIsCheckoutOpen(true) }
  const closeCheckout = () => setIsCheckoutOpen(false)

  return (
    <CartContext.Provider value={{
      items, count, total, isOpen, isCheckoutOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      openCheckout, closeCheckout,
      addItem, removeItem, updateQty, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
