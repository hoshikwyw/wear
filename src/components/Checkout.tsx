import { useState } from 'react'
import {
  ArrowLeft, X, ChevronRight, Check,
  MapPin, CreditCard, Banknote, Package,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

type Step = 'shipping' | 'payment' | 'confirm'
type PaymentMethod = 'cash' | 'card'

interface ShippingForm {
  name: string
  email: string
  phone: string
  address: string
  city: string
  note: string
}

interface CardForm {
  number: string
  holder: string
  expiry: string
  cvv: string
}

const FREE_SHIPPING = 100
const SHIPPING_FEE = 5.99

function Checkout() {
  const { items, total, isCheckoutOpen, closeCheckout, clearCart, openCart } = useCart()
  const { user } = useAuth()

  const [step, setStep] = useState<Step>('shipping')
  const [payMethod, setPayMethod] = useState<PaymentMethod>('cash')
  const [orderNumber] = useState(`ORD-${Date.now().toString().slice(-6)}`)
  const [errors, setErrors] = useState<Partial<ShippingForm & CardForm>>({})

  const shipping = total >= FREE_SHIPPING ? 0 : SHIPPING_FEE
  const grandTotal = total + shipping

  const [ship, setShip] = useState<ShippingForm>({
    name: user?.name ?? '', email: user?.email ?? '', phone: '', address: '', city: '', note: '',
  })
  const [card, setCard] = useState<CardForm>({
    number: '', holder: '', expiry: '', cvv: '',
  })

  const setS = (k: keyof ShippingForm, v: string) => {
    setShip((p) => ({ ...p, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }
  const setC = (k: keyof CardForm, v: string) => {
    setCard((p) => ({ ...p, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const validateShipping = () => {
    const e: Partial<ShippingForm> = {}
    if (!ship.name.trim())    e.name    = 'Required'
    if (!ship.email.trim() || !/\S+@\S+\.\S+/.test(ship.email)) e.email = 'Valid email required'
    if (!ship.phone.trim())   e.phone   = 'Required'
    if (!ship.address.trim()) e.address = 'Required'
    if (!ship.city.trim())    e.city    = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateCard = () => {
    const e: Partial<CardForm> = {}
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Enter full 16-digit number'
    if (!card.holder.trim()) e.holder = 'Required'
    if (card.expiry.length < 5) e.expiry = 'MM/YY required'
    if (card.cvv.length < 3)    e.cvv   = '3–4 digits'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goToPayment = () => { if (validateShipping()) setStep('payment') }

  const placeOrder = () => {
    if (payMethod === 'card' && !validateCard()) return
    setStep('confirm')
    clearCart()
  }

  const handleClose = () => {
    closeCheckout()
    setStep('shipping')
    setErrors({})
  }

  if (!isCheckoutOpen) return null

  return (
    <div className="fixed inset-0 z-60 flex flex-col bg-[#f2f0ed]">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-10 px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[640px] mx-auto flex items-center justify-between h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          {step !== 'confirm' ? (
            <button
              onClick={step === 'shipping' ? handleClose : () => setStep('shipping')}
              className="w-[44px] h-[44px] flex items-center justify-center -ml-2 text-primary active:scale-[0.95]"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-[44px]" />
          )}

          <span className="text-[13px] font-semibold text-primary">
            {step === 'shipping' ? 'Shipping Details' : step === 'payment' ? 'Payment' : 'Order Placed!'}
          </span>

          <button onClick={handleClose} className="w-[44px] h-[44px] flex items-center justify-center -mr-2 text-secondary active:scale-[0.95]">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── Step indicator ── */}
      {step !== 'confirm' && (
        <div className="max-w-[640px] mx-auto w-full px-4 sm:px-6 mb-2">
          <div className="flex items-center gap-2">
            {(['shipping', 'payment'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center justify-center w-[24px] h-[24px] rounded-full text-[11px] font-bold border-2 transition-all ${step === s ? 'bg-primary text-white border-primary' : step === 'payment' && s === 'shipping' ? 'bg-green-500 border-green-500 text-white' : 'bg-white/50 border-white/40 text-secondary'}`}>
                  {step === 'payment' && s === 'shipping' ? <Check size={12} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-[11px] font-medium capitalize ${step === s ? 'text-primary' : 'text-secondary'}`}>{s}</span>
                {i < 1 && <div className="flex-1 h-[1px] bg-black/10 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32">
        <div className="max-w-[640px] mx-auto flex flex-col gap-4">

          {/* ──────── SHIPPING STEP ──────── */}
          {step === 'shipping' && (
            <>
              <SectionCard title="Contact" icon={<MapPin size={14} />}>
                <Field label="Full Name" error={errors.name}>
                  <input value={ship.name} onChange={(e) => setS('name', e.target.value)} placeholder="Your full name" className={inp(!!errors.name)} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" error={errors.email}>
                    <input type="email" value={ship.email} onChange={(e) => setS('email', e.target.value)} placeholder="you@email.com" className={inp(!!errors.email)} />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input type="tel" value={ship.phone} onChange={(e) => setS('phone', e.target.value)} placeholder="+95 9..." className={inp(!!errors.phone)} />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard title="Delivery Address" icon={<MapPin size={14} />}>
                <Field label="Street Address" error={errors.address}>
                  <input value={ship.address} onChange={(e) => setS('address', e.target.value)} placeholder="Street, house no." className={inp(!!errors.address)} />
                </Field>
                <Field label="City / Township" error={errors.city}>
                  <input value={ship.city} onChange={(e) => setS('city', e.target.value)} placeholder="e.g. Yangon" className={inp(!!errors.city)} />
                </Field>
                <Field label="Note (optional)">
                  <textarea value={ship.note} onChange={(e) => setS('note', e.target.value)} placeholder="e.g. Leave at door" rows={2} className={`${inp(false)} h-auto py-3 resize-none`} />
                </Field>
              </SectionCard>

              {/* Order mini-summary */}
              <OrderSummary items={items} total={total} shipping={shipping} grandTotal={grandTotal} />
            </>
          )}

          {/* ──────── PAYMENT STEP ──────── */}
          {step === 'payment' && (
            <>
              <SectionCard title="Payment Method" icon={<CreditCard size={14} />}>
                {/* Cash */}
                <button
                  onClick={() => setPayMethod('cash')}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${payMethod === 'cash' ? 'border-accent bg-accent/5' : 'border-white/40 bg-white/30'}`}
                >
                  <div className={`w-[44px] h-[44px] rounded-xl flex items-center justify-center flex-none ${payMethod === 'cash' ? 'bg-accent/15 text-accent-dark' : 'bg-white/50 text-secondary'}`}>
                    <Banknote size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-primary">Cash on Delivery</p>
                    <p className="text-[12px] text-secondary mt-0.5">Pay when your order arrives</p>
                  </div>
                  <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center flex-none ${payMethod === 'cash' ? 'border-accent bg-accent' : 'border-white/50'}`}>
                    {payMethod === 'cash' && <Check size={11} strokeWidth={3} className="text-white" />}
                  </div>
                </button>

                {/* Card */}
                <button
                  onClick={() => setPayMethod('card')}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${payMethod === 'card' ? 'border-accent bg-accent/5' : 'border-white/40 bg-white/30'}`}
                >
                  <div className={`w-[44px] h-[44px] rounded-xl flex items-center justify-center flex-none ${payMethod === 'card' ? 'bg-accent/15 text-accent-dark' : 'bg-white/50 text-secondary'}`}>
                    <CreditCard size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-primary">Credit / Debit Card</p>
                    <p className="text-[12px] text-secondary mt-0.5">Visa, Mastercard, CB Pay</p>
                  </div>
                  <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center flex-none ${payMethod === 'card' ? 'border-accent bg-accent' : 'border-white/50'}`}>
                    {payMethod === 'card' && <Check size={11} strokeWidth={3} className="text-white" />}
                  </div>
                </button>
              </SectionCard>

              {/* Card form */}
              {payMethod === 'card' && (
                <SectionCard title="Card Details" icon={<CreditCard size={14} />}>
                  {/* Card visual */}
                  <div className="relative h-[160px] rounded-2xl bg-gradient-to-br from-primary via-primary-light to-[#4a4035] p-5 overflow-hidden mb-1">
                    <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[100px] h-[100px] rounded-full bg-accent/10 translate-y-1/2 -translate-x-1/4" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-semibold tracking-[3px] text-white/60 uppercase">WEAR</span>
                        <div className="flex gap-1">
                          <div className="w-[24px] h-[24px] rounded-full bg-white/20" />
                          <div className="w-[24px] h-[24px] rounded-full bg-white/10 -ml-2" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[15px] font-mono text-white tracking-[3px]">
                          {card.number || '•••• •••• •••• ••••'}
                        </p>
                        <div className="flex justify-between items-end mt-2">
                          <div>
                            <p className="text-[9px] text-white/40 uppercase tracking-wider">Cardholder</p>
                            <p className="text-[12px] text-white font-medium mt-0.5 uppercase tracking-wider">
                              {card.holder || 'YOUR NAME'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] text-white/40 uppercase tracking-wider">Expires</p>
                            <p className="text-[12px] text-white font-mono mt-0.5">{card.expiry || 'MM/YY'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Field label="Card Number" error={errors.number}>
                    <input
                      value={card.number}
                      onChange={(e) => setC('number', formatCard(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      maxLength={19}
                      className={`${inp(!!errors.number)} font-mono tracking-wider`}
                    />
                  </Field>
                  <Field label="Cardholder Name" error={errors.holder}>
                    <input value={card.holder} onChange={(e) => setC('holder', e.target.value.toUpperCase())} placeholder="AS ON CARD" className={`${inp(!!errors.holder)} uppercase tracking-wide`} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" error={errors.expiry}>
                      <input
                        value={card.expiry}
                        onChange={(e) => setC('expiry', formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        inputMode="numeric"
                        maxLength={5}
                        className={`${inp(!!errors.expiry)} font-mono`}
                      />
                    </Field>
                    <Field label="CVV" error={errors.cvv}>
                      <input
                        value={card.cvv}
                        onChange={(e) => setC('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="•••"
                        inputMode="numeric"
                        maxLength={4}
                        type="password"
                        className={`${inp(!!errors.cvv)} font-mono tracking-widest`}
                      />
                    </Field>
                  </div>
                </SectionCard>
              )}

              <OrderSummary items={items} total={total} shipping={shipping} grandTotal={grandTotal} />
            </>
          )}

          {/* ──────── CONFIRM STEP ──────── */}
          {step === 'confirm' && (
            <div className="flex flex-col items-center py-8 text-center gap-5">
              <div className="w-[80px] h-[80px] bg-green-100 rounded-full flex items-center justify-center">
                <Check size={36} className="text-green-600" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-primary">Order Placed!</h2>
                <p className="text-[14px] text-secondary mt-1">Thank you for shopping with WEAR</p>
              </div>

              <div className="w-full bg-white/55 backdrop-blur-xl rounded-2xl border border-white/40 p-5 text-left flex flex-col gap-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-secondary">Order number</span>
                  <span className="font-semibold text-primary font-mono">{orderNumber}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-secondary">Payment</span>
                  <span className="font-medium text-primary capitalize">{payMethod === 'cash' ? 'Cash on Delivery' : 'Card'}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-secondary">Total paid</span>
                  <span className="font-semibold text-primary">${grandTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-secondary">Deliver to</span>
                  <span className="font-medium text-primary text-right max-w-[200px]">{ship.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full bg-amber-50/80 rounded-2xl border border-amber-100 px-4 py-3">
                <Package size={18} className="text-amber-600 flex-none" />
                <p className="text-[12px] text-amber-700 text-left">
                  {payMethod === 'cash'
                    ? 'Your order is confirmed. Please prepare the exact amount on delivery.'
                    : 'Payment confirmed. Your order is being processed.'}
                </p>
              </div>

              <button
                onClick={() => { handleClose(); openCart() }}
                className="w-full h-[50px] bg-white/55 backdrop-blur-xl border border-white/40 text-primary text-[14px] font-medium rounded-xl active:scale-[0.97] transition-all"
                style={{ display: 'none' }}
              />
              <button
                onClick={handleClose}
                className="w-full h-[50px] bg-primary text-white text-[14px] font-semibold rounded-xl active:scale-[0.97] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky bottom CTA ── */}
      {step !== 'confirm' && (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-5 pt-2 bg-[#f2f0ed]/80 backdrop-blur-xl border-t border-black/5">
          <div className="max-w-[640px] mx-auto flex flex-col gap-2">
            <div className="flex justify-between text-[13px] px-1">
              <span className="text-secondary">Total</span>
              <span className="font-bold text-primary text-[15px]">${grandTotal.toFixed(2)}</span>
            </div>
            {step === 'shipping' ? (
              <button
                onClick={goToPayment}
                className="h-[52px] bg-primary text-white text-[14px] font-semibold rounded-xl active:scale-[0.97] hover:bg-primary-light transition-all flex items-center justify-center gap-2"
              >
                Continue to Payment <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={placeOrder}
                className="h-[52px] bg-accent text-white text-[14px] font-semibold rounded-xl active:scale-[0.97] hover:bg-accent-dark transition-all"
              >
                {payMethod === 'cash' ? 'Place Order — Cash on Delivery' : `Pay $${grandTotal.toFixed(2)}`}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Shared sub-components ──────────────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-secondary">
        {icon}
        <p className="text-[11px] font-semibold uppercase tracking-wider">{title}</p>
      </div>
      {children}
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-[11px] font-medium text-secondary uppercase tracking-wider">{label}</label>
        {error && <span className="text-[10px] text-danger font-medium">{error}</span>}
      </div>
      {children}
    </div>
  )
}

function OrderSummary({ items, total, shipping, grandTotal }: {
  items: ReturnType<typeof useCart>['items']
  total: number; shipping: number; grandTotal: number
}) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary mb-3">Order Summary</p>
      <div className="flex flex-col gap-2 mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-[12px]">
            <span className="w-[10px] h-[10px] rounded-full flex-none border border-white/60" style={{ background: item.color }} />
            <span className="flex-1 text-primary truncate">{item.product.name}</span>
            <span className="text-secondary">{item.size} ×{item.qty}</span>
            <span className="font-medium text-primary w-12 text-right">${(item.product.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 pt-3 flex flex-col gap-1.5">
        <div className="flex justify-between text-[12px]">
          <span className="text-secondary">Subtotal</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-secondary">Shipping</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-primary'}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-[14px] font-bold text-primary mt-1">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

const inp = (hasError: boolean) =>
  `h-[46px] w-full bg-white/60 rounded-xl border px-4 text-[13px] text-primary placeholder:text-secondary/40 focus:outline-none transition-all ${hasError ? 'border-danger/50 bg-danger/5 focus:ring-2 focus:ring-danger/10' : 'border-white/40 focus:border-accent/40 focus:ring-2 focus:ring-accent/10'}`

export default Checkout
