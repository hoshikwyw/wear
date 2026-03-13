import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import type { Product, GarmentType } from '../../../types/product'
import GarmentRenderer from '../../garments/GarmentRenderer'

interface Props {
  products: Product[]
  onChange: (products: Product[]) => void
}

const garmentTypes: GarmentType[] = ['tshirt', 'hoodie', 'crop-top', 'long-sleeve', 'sweatshirt']
const categoryOptions = ['T-Shirts', 'Hoodies', 'Tops', 'Sweatshirts', 'Jackets', 'Polos']
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

type FormState = Omit<Product, 'id'>
const emptyForm = (): FormState => ({
  name: '', price: 0, originalPrice: undefined, tag: undefined,
  colors: ['#1a1a1a'], category: 'T-Shirts', description: '',
  sizes: ['M'], material: '', fit: 'Regular',
  garmentType: 'tshirt', customizable: true,
})

function ProductManagement({ products, onChange }: Props) {
  const [form, setForm] = useState<FormState | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [newColor, setNewColor] = useState('#b08968')

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => f ? { ...f, [k]: v } : f)

  const toggleSize = (s: string) =>
    set('sizes', form!.sizes.includes(s) ? form!.sizes.filter((x) => x !== s) : [...form!.sizes, s])

  const openAdd = () => { setEditId(null); setForm(emptyForm()) }
  const openEdit = (p: Product) => { setEditId(p.id); setForm({ ...p }) }
  const closeForm = () => { setForm(null); setEditId(null) }

  const save = () => {
    if (!form || !form.name.trim() || !form.price) return
    if (editId !== null) {
      onChange(products.map((p) => p.id === editId ? { ...form, id: editId } : p))
    } else {
      const newId = Math.max(0, ...products.map((p) => p.id)) + 1
      onChange([...products, { ...form, id: newId }])
    }
    closeForm()
  }

  const remove = (id: number) => {
    onChange(products.filter((p) => p.id !== id))
    setDeleteId(null)
  }

  if (form) {
    return (
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-primary">{editId ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={closeForm} className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white/50 border border-white/40 text-secondary">
            <X size={16} />
          </button>
        </div>

        {/* Preview */}
        <div className="aspect-[3/2] rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30 flex items-center justify-center p-8">
          <GarmentRenderer type={form.garmentType} color={form.colors[0]} className="h-full drop-shadow" />
        </div>

        <Field label="Name"><input value={form.name} onChange={(e) => set('name', e.target.value)} className={inp} placeholder="Product name" /></Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Price ($)"><input type="number" value={form.price || ''} onChange={(e) => set('price', Number(e.target.value))} className={inp} placeholder="0" /></Field>
          <Field label="Original ($)"><input type="number" value={form.originalPrice || ''} onChange={(e) => set('originalPrice', e.target.value ? Number(e.target.value) : undefined)} className={inp} placeholder="Optional" /></Field>
        </div>

        <Field label="Category">
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((c) => <Chip key={c} label={c} active={form.category === c} onClick={() => set('category', c)} />)}
          </div>
        </Field>

        <Field label="Garment Type">
          <div className="flex flex-wrap gap-2">
            {garmentTypes.map((t) => <Chip key={t} label={t} active={form.garmentType === t} onClick={() => set('garmentType', t)} />)}
          </div>
        </Field>

        <Field label="Sizes">
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((s) => <Chip key={s} label={s} active={form.sizes.includes(s)} onClick={() => toggleSize(s)} />)}
          </div>
        </Field>

        <Field label="Colors">
          <div className="flex flex-wrap gap-2 mb-2">
            {form.colors.map((c) => (
              <button key={c} onClick={() => form.colors.length > 1 && set('colors', form.colors.filter((x) => x !== c))}
                className="w-[36px] h-[36px] rounded-lg border-2 border-white shadow-sm relative group"
                style={{ background: c }}>
                {form.colors.length > 1 && <span className="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger rounded-full text-white text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100">×</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="w-[40px] h-[40px] rounded-lg cursor-pointer border-2 border-white" />
            <button onClick={() => !form.colors.includes(newColor) && set('colors', [...form.colors, newColor])}
              className="h-[40px] px-3 text-[12px] rounded-lg bg-white/50 border border-white/40 text-primary">+ Add</button>
          </div>
        </Field>

        <Field label="Material"><input value={form.material} onChange={(e) => set('material', e.target.value)} className={inp} placeholder="e.g. 100% Cotton" /></Field>
        <Field label="Fit"><input value={form.fit} onChange={(e) => set('fit', e.target.value)} className={inp} placeholder="Regular / Slim / Oversized" /></Field>
        <Field label="Description"><textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} className={`${inp} h-auto py-3 resize-none`} placeholder="Short description..." /></Field>

        <div className="flex items-center justify-between py-3 px-4 bg-white/40 rounded-xl border border-white/30">
          <span className="text-[13px] font-medium text-primary">Customizable</span>
          <button onClick={() => set('customizable', !form.customizable)}
            className={`w-[44px] h-[26px] rounded-full border-2 transition-all ${form.customizable ? 'bg-accent border-accent' : 'bg-white/50 border-white/40'}`}>
            <div className={`w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${form.customizable ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
          </button>
        </div>

        <button onClick={save}
          className="h-[50px] bg-primary text-white text-[13px] font-semibold rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all mt-2">
          <Check size={16} /> {editId ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-secondary">{products.length} products</p>
        <button onClick={openAdd}
          className="flex items-center gap-1.5 h-[38px] px-4 bg-primary text-white text-[12px] font-medium rounded-xl active:scale-[0.97]">
          <Plus size={14} /> Add Product
        </button>
      </div>

      {products.map((p) => (
        <div key={p.id} className="flex items-center gap-3 bg-white/50 backdrop-blur-xl rounded-xl border border-white/40 p-3">
          <div className="w-[52px] h-[52px] bg-white/60 rounded-xl flex items-center justify-center flex-none p-2">
            <GarmentRenderer type={p.garmentType} color={p.colors[0]} className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-primary truncate">{p.name}</p>
            <p className="text-[11px] text-secondary">{p.category} · ${p.price}</p>
            <div className="flex gap-1 mt-1">
              {p.colors.slice(0, 4).map((c) => (
                <span key={c} className="w-[10px] h-[10px] rounded-full border border-white/60" style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            <button onClick={() => openEdit(p)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary hover:text-primary transition-colors">
              <Pencil size={14} />
            </button>
            {deleteId === p.id ? (
              <div className="flex gap-1">
                <button onClick={() => remove(p.id)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-danger/10 border border-danger/20 text-danger"><Check size={14} /></button>
                <button onClick={() => setDeleteId(null)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary"><X size={14} /></button>
              </div>
            ) : (
              <button onClick={() => setDeleteId(p.id)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary hover:text-danger transition-colors">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-primary uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`h-[34px] px-3 rounded-full text-[12px] font-medium border transition-all active:scale-[0.95] ${active ? 'bg-primary text-white border-primary' : 'bg-white/50 text-primary border-white/40'}`}>
      {label}
    </button>
  )
}

const inp = 'h-[46px] w-full bg-white/50 rounded-xl border border-white/40 px-4 text-[13px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all'

export default ProductManagement
