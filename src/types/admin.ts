export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: number
  productName: string
  size: string
  color: string
  qty: number
  price: number
}

export interface Order {
  id: string
  customer: { name: string; email: string; address: string }
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
}

export interface AdminCategory {
  id: number
  name: string
  icon: string
  active: boolean
}

// productId -> size -> qty
export type StockMap = Record<number, Record<string, number>>
