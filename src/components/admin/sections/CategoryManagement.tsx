import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check, ToggleLeft, ToggleRight } from 'lucide-react'
import type { AdminCategory } from '../../../types/admin'
import type { Product } from '../../../types/product'
import { supabase } from '../../../lib/supabase'

interface Props {
  categories: AdminCategory[]
  products: Product[]
  onChange: (cats: AdminCategory[]) => void
}

const emojiOptions = ['👕', '🧥', '👚', '🧶', '👔', '🩱', '🥼', '👗', '🩲', '🧤']

function CategoryManagement({ categories, products, onChange }: Props) {
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editIcon, setEditIcon] = useState('👕')
  const [addMode, setAddMode] = useState(false)
  const [newName, setNewName] = useState('')
  const [newIcon, setNewIcon] = useState('👕')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const countFor = (name: string) => products.filter((p) => p.category === name).length

  const openEdit = (cat: AdminCategory) => {
    setEditId(cat.id); setEditName(cat.name); setEditIcon(cat.icon)
    setAddMode(false)
  }
  const closeEdit = () => { setEditId(null); setAddMode(false) }

  const saveEdit = async () => {
    if (!editName.trim() || editId === null) return
    setSaving(true)
    const { error } = await supabase
      .from('categories')
      .update({ name: editName.trim(), icon: editIcon })
      .eq('id', editId)
    if (!error) {
      onChange(categories.map((c) => c.id === editId ? { ...c, name: editName.trim(), icon: editIcon } : c))
      closeEdit()
    }
    setSaving(false)
  }

  const saveAdd = async () => {
    if (!newName.trim()) return
    setSaving(true)
    const { data, error } = await supabase
      .from('categories')
      .insert({ name: newName.trim(), icon: newIcon, active: true })
      .select()
      .single()
    if (!error && data) {
      onChange([...categories, { id: data.id, name: data.name, icon: data.icon, active: data.active }])
      setNewName(''); setNewIcon('👕'); setAddMode(false)
    }
    setSaving(false)
  }

  const toggle = async (cat: AdminCategory) => {
    const { error } = await supabase
      .from('categories')
      .update({ active: !cat.active })
      .eq('id', cat.id)
    if (!error) onChange(categories.map((c) => c.id === cat.id ? { ...c, active: !c.active } : c))
  }

  const remove = async (id: number) => {
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (!error) {
      onChange(categories.filter((c) => c.id !== id))
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-secondary">{categories.length} categories</p>
        <button onClick={() => { setAddMode(true); setEditId(null) }}
          className="flex items-center gap-1.5 h-[38px] px-4 bg-primary text-white text-[12px] font-medium rounded-xl active:scale-[0.97]">
          <Plus size={14} /> Add Category
        </button>
      </div>

      {/* Add form */}
      {addMode && (
        <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4 flex flex-col gap-3">
          <p className="text-[12px] font-semibold text-primary uppercase tracking-wider">New Category</p>
          <div className="flex flex-wrap gap-2">
            {emojiOptions.map((e) => (
              <button key={e} onClick={() => setNewIcon(e)}
                className={`w-[40px] h-[40px] text-[22px] rounded-xl border-2 transition-all ${newIcon === e ? 'border-accent bg-accent/10' : 'border-white/40 bg-white/40'}`}>
                {e}
              </button>
            ))}
          </div>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Category name"
            className="h-[44px] bg-white/60 rounded-xl border border-white/40 px-4 text-[13px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 transition-all" />
          <div className="flex gap-2">
            <button onClick={saveAdd} disabled={saving}
              className="flex-1 h-[42px] bg-primary text-white text-[13px] font-medium rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.97] disabled:opacity-60">
              {saving ? <span className="w-[14px] h-[14px] border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
            </button>
            <button onClick={() => setAddMode(false)} className="h-[42px] px-4 bg-white/50 border border-white/40 text-secondary text-[13px] rounded-xl active:scale-[0.97]"><X size={16} /></button>
          </div>
        </div>
      )}

      {categories.map((cat) => (
        <div key={cat.id}>
          {editId === cat.id ? (
            <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-accent/20 p-4 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {emojiOptions.map((e) => (
                  <button key={e} onClick={() => setEditIcon(e)}
                    className={`w-[40px] h-[40px] text-[22px] rounded-xl border-2 transition-all ${editIcon === e ? 'border-accent bg-accent/10' : 'border-white/40 bg-white/40'}`}>
                    {e}
                  </button>
                ))}
              </div>
              <input value={editName} onChange={(e) => setEditName(e.target.value)}
                className="h-[44px] bg-white/60 rounded-xl border border-white/40 px-4 text-[13px] text-primary focus:outline-none focus:border-accent/40 transition-all" />
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving}
                  className="flex-1 h-[40px] bg-primary text-white text-[13px] rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.97] disabled:opacity-60">
                  {saving ? <span className="w-[14px] h-[14px] border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
                </button>
                <button onClick={closeEdit} className="h-[40px] px-4 bg-white/50 border border-white/40 text-secondary rounded-xl"><X size={16} /></button>
              </div>
            </div>
          ) : (
            <div className={`flex items-center gap-3 bg-white/50 backdrop-blur-xl rounded-xl border px-4 py-3 ${cat.active ? 'border-white/40' : 'border-white/20 opacity-60'}`}>
              <span className="text-[28px] flex-none">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-primary">{cat.name}</p>
                <p className="text-[11px] text-secondary">{countFor(cat.name)} products</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggle(cat)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg text-secondary hover:text-accent transition-colors">
                  {cat.active ? <ToggleRight size={20} className="text-accent" /> : <ToggleLeft size={20} />}
                </button>
                <button onClick={() => openEdit(cat)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary hover:text-primary transition-colors"><Pencil size={14} /></button>
                {deleteId === cat.id ? (
                  <>
                    <button onClick={() => remove(cat.id)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-danger/10 border border-danger/20 text-danger"><Check size={14} /></button>
                    <button onClick={() => setDeleteId(null)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary"><X size={14} /></button>
                  </>
                ) : (
                  <button onClick={() => setDeleteId(cat.id)} className="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-white/60 border border-white/40 text-secondary hover:text-danger transition-colors"><Trash2 size={14} /></button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CategoryManagement
