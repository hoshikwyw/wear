import type { Product } from './product'

export interface CartItem {
  id: string           // unique key: productId-size-color (or 'custom-timestamp')
  product: Product
  size: string
  color: string
  qty: number
  isCustom?: boolean
}
