import type { Order, AdminCategory, StockMap } from '../../../types/admin'
import type { Product } from '../../../types/product'

interface Props {
  products: Product[]
  categories: AdminCategory[]
  orders: Order[]
  stock: StockMap
}

const statusColor: Record<string, string> = {
  pending:    'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
}

function OverviewSection({ products, categories, orders, stock }: Props) {
  const revenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0)

  const pendingCount = orders.filter((o) => o.status === 'pending').length

  const lowStock = Object.entries(stock).flatMap(([pid, sizes]) =>
    Object.entries(sizes)
      .filter(([, qty]) => qty <= 5)
      .map(([size, qty]) => ({
        product: products.find((p) => p.id === Number(pid)),
        size,
        qty,
      }))
  ).filter((s) => s.product)

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-5">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Products" value={products.length} sub="in catalogue" color="bg-blue-50 text-blue-600" />
        <StatCard label="Categories" value={categories.filter((c) => c.active).length} sub="active" color="bg-violet-50 text-violet-600" />
        <StatCard label="Orders" value={orders.length} sub={`${pendingCount} pending`} color="bg-amber-50 text-amber-600" />
        <StatCard label="Revenue" value={`$${revenue.toLocaleString()}`} sub="excl. cancelled" color="bg-green-50 text-green-600" />
      </div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50/80 backdrop-blur-xl rounded-2xl border border-amber-100 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 mb-3">
            ⚠ Low Stock ({lowStock.length})
          </p>
          <div className="flex flex-col gap-2">
            {lowStock.map(({ product, size, qty }) => (
              <div key={`${product!.id}-${size}`} className="flex items-center justify-between text-[13px]">
                <span className="text-primary font-medium">{product!.name}</span>
                <span className="text-secondary">{size} — <span className="font-semibold text-amber-700">{qty} left</span></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary mb-3">Recent Orders</p>
        <div className="flex flex-col gap-2">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between bg-white/50 backdrop-blur-xl rounded-xl border border-white/40 px-4 py-3">
              <div>
                <p className="text-[13px] font-medium text-primary">{order.customer.name}</p>
                <p className="text-[11px] text-secondary">{order.id} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-semibold text-primary">${order.total}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4">
      <p className="text-[11px] text-secondary uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-[26px] font-bold ${color.split(' ')[1]}`}>{value}</p>
      <p className="text-[11px] text-secondary mt-0.5">{sub}</p>
    </div>
  )
}

export default OverviewSection
