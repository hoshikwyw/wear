import { useState } from 'react'
import { ArrowLeft, LogOut, Plus, X, Check } from 'lucide-react'
import type { GarmentType, Product } from '../../types/product'
import GarmentRenderer from '../garments/GarmentRenderer'

interface Props {
  onBack: () => void
  onLogout: () => void
}

const garmentTypes: GarmentType[] = ['tshirt', 'hoodie', 'crop-top', 'long-sleeve', 'sweatshirt']
const garmentTypeLabels: Record<GarmentType, string> = {
  tshirt: 'T-Shirt',
  hoodie: 'Hoodie',
  'crop-top': 'Crop Top',
  'long-sleeve': 'Long Sleeve',
  sweatshirt: 'Sweatshirt',
}
const categoryOptions = ['T-Shirts', 'Hoodies', 'Tops', 'Sweatshirts', 'Jackets', 'Polos']
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const fitOptions = ['Regular', 'Slim', 'Relaxed', 'Oversized', 'Relaxed Crop']
const tagOptions = ['New', 'Best Seller', 'Sale', 'Limited']

interface FormState {
  name: string
  price: string
  originalPrice: string
  tag: string
  category: string
  description: string
  material: string
  fit: string
  garmentType: GarmentType
  customizable: boolean
  colors: string[]
  sizes: string[]
}

const empty: FormState = {
  name: '',
  price: '',
  originalPrice: '',
  tag: '',
  category: 'T-Shirts',
  description: '',
  material: '',
  fit: 'Regular',
  garmentType: 'tshirt',
  customizable: true,
  colors: ['#1a1a1a'],
  sizes: [],
}

function AddProduct({ onBack, onLogout }: Props) {
  const [form, setForm] = useState<FormState>(empty)
  const [newColor, setNewColor] = useState('#c9a87c')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleSize = (size: string) => {
    set('sizes', form.sizes.includes(size)
      ? form.sizes.filter((s) => s !== size)
      : [...form.sizes, size])
  }

  const addColor = () => {
    if (!form.colors.includes(newColor)) {
      set('colors', [...form.colors, newColor])
    }
  }

  const removeColor = (color: string) => {
    if (form.colors.length > 1) set('colors', form.colors.filter((c) => c !== color))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.price || isNaN(Number(form.price))) e.price = 'Enter a valid price'
    if (form.originalPrice && isNaN(Number(form.originalPrice))) e.originalPrice = 'Enter a valid price'
    if (!form.description.trim()) e.description = 'Required'
    if (!form.material.trim()) e.material = 'Required'
    if (form.sizes.length === 0) e.sizes = 'Select at least one size'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // Build the product object (would POST to API / insert to Supabase later)
    const product: Omit<Product, 'id'> = {
      name: form.name.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      tag: form.tag || undefined,
      colors: form.colors,
      category: form.category,
      description: form.description.trim(),
      sizes: form.sizes,
      material: form.material.trim(),
      fit: form.fit,
      garmentType: form.garmentType,
      customizable: form.customizable,
    }

    console.log('New product (ready for Supabase):', product)
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm(empty)
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-[#f2f0ed] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[380px] text-center">
          <div className="w-[72px] h-[72px] rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5">
            <Check size={32} className="text-accent" strokeWidth={2} />
          </div>
          <h2 className="text-[22px] font-semibold text-primary mb-2">Product Saved</h2>
          <p className="text-[14px] text-secondary mb-8">
            <span className="font-medium text-primary">{form.name}</span> is ready.
            Connect Supabase to persist to your database.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleReset}
              className="h-[50px] bg-primary text-white text-[14px] font-semibold rounded-xl active:scale-[0.97] transition-all"
            >
              Add Another Product
            </button>
            <button
              onClick={onBack}
              className="h-[50px] bg-white/55 backdrop-blur-xl border border-white/40 text-primary text-[14px] font-medium rounded-xl active:scale-[0.97] transition-all"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-[#f2f0ed]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[860px] mx-auto flex items-center justify-between h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <button
            onClick={onBack}
            className="w-[44px] h-[44px] flex items-center justify-center -ml-2 text-primary active:scale-[0.95] transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-[13px] font-medium text-primary">Add Product</span>
          <button
            onClick={onLogout}
            className="w-[44px] h-[44px] flex items-center justify-center -mr-2 text-secondary active:scale-[0.95] transition-transform"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 pb-28">
          <div className="sm:grid sm:grid-cols-2 sm:gap-8 lg:gap-12">

            {/* Live preview */}
            <div className="sm:sticky sm:top-20">
              <div className="aspect-square rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-center p-12 mb-3 mt-2 sm:mb-4">
                <GarmentRenderer
                  type={form.garmentType}
                  color={form.colors[0]}
                  className="w-full h-full drop-shadow-md"
                />
              </div>
              <p className="text-center text-[11px] text-secondary mb-6 sm:mb-0">Live preview</p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-5">

              {/* Product name */}
              <Field label="Product Name" error={errors.name} required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Classic Cotton Crew Tee"
                  className={input(!!errors.name)}
                />
              </Field>

              {/* Category */}
              <Field label="Category" required>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => set('category', cat)}
                      className={chip(form.category === cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Garment type */}
              <Field label="Garment Type" required>
                <div className="flex flex-wrap gap-2">
                  {garmentTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set('garmentType', t)}
                      className={chip(form.garmentType === t)}
                    >
                      {garmentTypeLabels[t]}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Price row */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Price ($)" error={errors.price} required>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => set('price', e.target.value)}
                    placeholder="0.00"
                    className={input(!!errors.price)}
                  />
                </Field>
                <Field label="Original Price ($)" error={errors.originalPrice}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.originalPrice}
                    onChange={(e) => set('originalPrice', e.target.value)}
                    placeholder="Optional"
                    className={input(!!errors.originalPrice)}
                  />
                </Field>
              </div>

              {/* Tag */}
              <Field label="Tag">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => set('tag', '')}
                    className={chip(form.tag === '')}
                  >
                    None
                  </button>
                  {tagOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set('tag', t)}
                      className={chip(form.tag === t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Sizes */}
              <Field label="Sizes" error={errors.sizes} required>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={chip(form.sizes.includes(s))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Colors */}
              <Field label="Colors" required>
                <div className="flex flex-wrap gap-2.5 mb-3">
                  {form.colors.map((color) => (
                    <div key={color} className="relative">
                      <div
                        className="w-[40px] h-[40px] rounded-xl border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                        style={{ background: color }}
                      />
                      {form.colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-danger text-white flex items-center justify-center"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-[48px] h-[44px] rounded-xl border-2 border-white cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="flex items-center gap-1.5 h-[44px] px-4 rounded-xl bg-white/50 backdrop-blur-xl border border-white/40 text-[13px] font-medium text-primary active:scale-[0.95] transition-all"
                  >
                    <Plus size={14} /> Add Color
                  </button>
                </div>
              </Field>

              {/* Fit */}
              <Field label="Fit" required>
                <div className="flex flex-wrap gap-2">
                  {fitOptions.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => set('fit', f)}
                      className={chip(form.fit === f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Material */}
              <Field label="Material" error={errors.material} required>
                <input
                  type="text"
                  value={form.material}
                  onChange={(e) => set('material', e.target.value)}
                  placeholder="e.g. 100% Organic Cotton"
                  className={input(!!errors.material)}
                />
              </Field>

              {/* Description */}
              <Field label="Description" error={errors.description} required>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Short product description..."
                  className={`${input(!!errors.description)} h-auto py-3 resize-none`}
                />
              </Field>

              {/* Customizable */}
              <div className="flex items-center justify-between py-3 px-4 bg-white/40 backdrop-blur-xl rounded-xl border border-white/30">
                <div>
                  <p className="text-[13px] font-medium text-primary">Customizable</p>
                  <p className="text-[11px] text-secondary">Allow custom prints & text</p>
                </div>
                <button
                  type="button"
                  onClick={() => set('customizable', !form.customizable)}
                  className={`w-[48px] h-[28px] rounded-full border-2 transition-all ${
                    form.customizable ? 'bg-accent border-accent' : 'bg-white/50 border-white/40'
                  }`}
                >
                  <div className={`w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform ${
                    form.customizable ? 'translate-x-[20px]' : 'translate-x-[2px]'
                  }`} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Sticky submit bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2">
          <div className="max-w-[860px] mx-auto p-2 bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
            <button
              type="submit"
              className="w-full h-[50px] bg-primary text-white text-[14px] font-semibold uppercase tracking-wider rounded-xl active:scale-[0.97] transition-all"
            >
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

// Helpers
function Field({
  label, children, error, required,
}: {
  label: string; children: React.ReactNode; error?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-primary uppercase tracking-wider px-0.5">
        {label}{required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-danger px-0.5">{error}</p>}
    </div>
  )
}

const input = (hasError: boolean) =>
  `h-[50px] w-full bg-white/50 backdrop-blur-xl rounded-xl border px-4 text-[14px] text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-2 transition-all ${
    hasError
      ? 'border-danger/40 focus:ring-danger/10 focus:border-danger/60'
      : 'border-white/40 focus:ring-accent/10 focus:border-accent/40'
  }`

const chip = (active: boolean) =>
  `h-[38px] px-4 rounded-full text-[12px] font-medium border transition-all active:scale-[0.95] ${
    active
      ? 'bg-primary text-white border-primary'
      : 'bg-white/50 backdrop-blur-xl text-primary border-white/40'
  }`

export default AddProduct
