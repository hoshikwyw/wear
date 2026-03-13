import { useState } from 'react'
import { LayoutDashboard, Package, Tag, Layers, ShoppingBag, LogOut } from 'lucide-react'
import type { Product } from '../../types/product'
import type { Order, AdminCategory, StockMap } from '../../types/admin'
import { products as seedProducts } from '../../data/products'
import { mockOrders } from '../../data/orders'
import { initialStock } from '../../data/stock'
import { initialCategories } from '../../data/categories'
import OverviewSection from './sections/OverviewSection'
import ProductManagement from './sections/ProductManagement'
import CategoryManagement from './sections/CategoryManagement'
import StockManagement from './sections/StockManagement'
import OrderManagement from './sections/OrderManagement'

type Section = 'overview' | 'products' | 'categories' | 'stock' | 'orders'

interface Props {
  onLogout: () => void
  onBackToStore: () => void
}

const tabs: { key: Section; label: string; Icon: React.ElementType }[] = [
  { key: 'overview',    label: 'Overview',    Icon: LayoutDashboard },
  { key: 'products',   label: 'Products',    Icon: Package         },
  { key: 'categories', label: 'Categories',  Icon: Tag             },
  { key: 'stock',      label: 'Stock',       Icon: Layers          },
  { key: 'orders',     label: 'Orders',      Icon: ShoppingBag     },
]

const sectionTitle: Record<Section, string> = {
  overview:    'Dashboard',
  products:    'Products',
  categories:  'Categories',
  stock:       'Stock',
  orders:      'Orders',
}

function AdminDashboard({ onLogout, onBackToStore }: Props) {
  const [section, setSection] = useState<Section>('overview')
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [categories, setCategories] = useState<AdminCategory[]>(initialCategories)
  const [stock, setStock] = useState<StockMap>(initialStock)

  const pendingCount = orders.filter((o) => o.status === 'pending').length

  return (
    <div className="min-h-[100dvh] bg-[#f2f0ed] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-30 px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[860px] mx-auto flex items-center justify-between h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <button
            onClick={onBackToStore}
            className="text-[12px] font-medium text-secondary hover:text-primary transition-colors"
          >
            ← Store
          </button>
          <span className="text-[14px] font-semibold text-primary tracking-wide">
            WEAR <span className="text-secondary font-normal">Admin</span>
          </span>
          <button
            onClick={onLogout}
            className="w-[40px] h-[40px] flex items-center justify-center text-secondary active:scale-[0.95] transition-transform"
            aria-label="Logout"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>

      {/* Desktop tab bar */}
      <div className="hidden sm:block sticky top-[60px] z-20 px-4 sm:px-6 pb-2">
        <div className="max-w-[860px] mx-auto flex gap-1 p-1 bg-white/40 backdrop-blur-xl rounded-xl border border-white/30">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 h-[38px] rounded-lg text-[12px] font-medium transition-all ${
                section === key ? 'bg-white/80 text-primary shadow-sm' : 'text-secondary hover:text-primary'
              }`}
            >
              <Icon size={14} />
              {label}
              {key === 'orders' && pendingCount > 0 && (
                <span className="absolute top-1 right-1 w-[16px] h-[16px] bg-danger rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Section title (mobile) */}
      <div className="sm:hidden px-4 pt-1 pb-2">
        <h1 className="text-[18px] font-semibold text-primary">{sectionTitle[section]}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-[860px] mx-auto w-full px-4 sm:px-6 pb-24 sm:pb-8">
        {section === 'overview' && (
          <OverviewSection products={products} categories={categories} orders={orders} stock={stock} />
        )}
        {section === 'products' && (
          <ProductManagement products={products} onChange={setProducts} />
        )}
        {section === 'categories' && (
          <CategoryManagement categories={categories} products={products} onChange={setCategories} />
        )}
        {section === 'stock' && (
          <StockManagement products={products} stock={stock} onChange={setStock} />
        )}
        {section === 'orders' && (
          <OrderManagement orders={orders} onChange={setOrders} />
        )}
      </div>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden px-3 pb-3">
        <div className="flex items-center bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_-2px_20px_rgba(0,0,0,0.06)] p-1">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 h-[56px] rounded-xl transition-all ${
                section === key ? 'bg-white/80 text-primary' : 'text-secondary'
              }`}
            >
              <Icon size={19} strokeWidth={section === key ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{label}</span>
              {key === 'orders' && pendingCount > 0 && (
                <span className="absolute top-1.5 right-[calc(50%-18px)] w-[14px] h-[14px] bg-danger rounded-full text-white text-[8px] font-bold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
