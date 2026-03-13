import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import type { Order, OrderStatus } from '../../../types/admin'

interface Props {
  orders: Order[]
  onChange: (orders: Order[]) => void
}

const allStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const statusStyle: Record<OrderStatus, string> = {
  pending:    'bg-amber-100 text-amber-700 border-amber-200',
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped:    'bg-purple-100 text-purple-700 border-purple-200',
  delivered:  'bg-green-100 text-green-700 border-green-200',
  cancelled:  'bg-red-100 text-red-700 border-red-200',
}

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending:    'processing',
  processing: 'shipped',
  shipped:    'delivered',
}

function OrderManagement({ orders, onChange }: Props) {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [cancelId, setCancelId] = useState<string | null>(null)

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const advance = (id: string) => {
    onChange(orders.map((o) => {
      if (o.id !== id) return o
      const next = nextStatus[o.status]
      return next ? { ...o, status: next } : o
    }))
  }

  const cancel = (id: string) => {
    onChange(orders.map((o) => o.id === id ? { ...o, status: 'cancelled' } : o))
    setCancelId(null)
  }

  const counts = allStatuses.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length
    return acc
  }, {} as Record<OrderStatus, number>)

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Status filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        <button
          onClick={() => setFilter('all')}
          className={`flex-none h-[34px] px-3 rounded-full text-[12px] font-medium border transition-all ${filter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white/50 text-primary border-white/40'}`}
        >
          All ({orders.length})
        </button>
        {allStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-none h-[34px] px-3 rounded-full text-[12px] font-medium border capitalize transition-all ${
              filter === s ? `${statusStyle[s]} scale-[1.02]` : 'bg-white/50 text-primary border-white/40'
            }`}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      <p className="text-[12px] text-secondary">{sorted.length} orders</p>

      {sorted.length === 0 && (
        <div className="text-center py-12 text-secondary text-[14px]">No orders with this status.</div>
      )}

      {sorted.map((order) => {
        const expanded = expandedId === order.id
        const canAdvance = !!nextStatus[order.status]

        return (
          <div key={order.id} className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 overflow-hidden">
            {/* Order header */}
            <button
              onClick={() => setExpandedId(expanded ? null : order.id)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[13px] font-semibold text-primary">{order.customer.name}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-[11px] text-secondary mt-0.5">{order.id} · {formatDate(order.createdAt)}</p>
                <p className="text-[11px] text-secondary">{order.items.length} item{order.items.length > 1 ? 's' : ''} · <span className="font-semibold text-primary">${order.total}</span></p>
              </div>
              {expanded ? <ChevronUp size={16} className="text-secondary mt-1 flex-none" /> : <ChevronDown size={16} className="text-secondary mt-1 flex-none" />}
            </button>

            {/* Expanded detail */}
            {expanded && (
              <div className="border-t border-white/30 px-4 pb-4 pt-3 flex flex-col gap-3">
                {/* Customer info */}
                <div className="bg-white/40 rounded-xl p-3">
                  <p className="text-[11px] text-secondary uppercase tracking-wider mb-1">Customer</p>
                  <p className="text-[13px] font-medium text-primary">{order.customer.name}</p>
                  <p className="text-[12px] text-secondary">{order.customer.email}</p>
                  <p className="text-[12px] text-secondary">{order.customer.address}</p>
                </div>

                {/* Items */}
                <div>
                  <p className="text-[11px] text-secondary uppercase tracking-wider mb-2">Items</p>
                  <div className="flex flex-col gap-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[13px]">
                        <div className="flex items-center gap-2">
                          <span className="w-[12px] h-[12px] rounded-full border border-white/60 flex-none" style={{ background: item.color }} />
                          <span className="text-primary">{item.productName}</span>
                          <span className="text-secondary text-[11px]">{item.size} ×{item.qty}</span>
                        </div>
                        <span className="font-medium text-primary">${item.price * item.qty}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[13px] font-semibold text-primary border-t border-black/5 pt-2 mt-1">
                      <span>Total</span>
                      <span>${order.total}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="flex gap-2">
                    {canAdvance && (
                      <button
                        onClick={() => advance(order.id)}
                        className="flex-1 h-[42px] bg-primary text-white text-[12px] font-semibold rounded-xl capitalize active:scale-[0.97] transition-all"
                      >
                        Mark as {nextStatus[order.status]}
                      </button>
                    )}
                    {cancelId === order.id ? (
                      <>
                        <button onClick={() => cancel(order.id)} className="h-[42px] px-4 bg-danger/10 border border-danger/20 text-danger text-[12px] rounded-xl active:scale-[0.97]">Confirm Cancel</button>
                        <button onClick={() => setCancelId(null)} className="h-[42px] px-3 bg-white/60 border border-white/40 text-secondary rounded-xl"><X size={14} /></button>
                      </>
                    ) : (
                      <button onClick={() => setCancelId(order.id)} className="h-[42px] px-4 bg-white/60 border border-white/40 text-secondary text-[12px] rounded-xl active:scale-[0.97]">
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default OrderManagement
