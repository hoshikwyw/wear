import { useState, useRef } from 'react'
import {
  ArrowLeft, RotateCcw, ShoppingBag,
  Type, ImagePlus, Palette,
  Bold, Italic, Trash2, Minus, Plus, Check,
} from 'lucide-react'
import type { Product } from '../types/product'
import GarmentRenderer from './garments/GarmentRenderer'
import { useCart } from '../context/CartContext'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TextEl {
  id: string; type: 'text'
  content: string
  x: number; y: number        // % of canvas
  fontSize: number            // px
  color: string
  bold: boolean; italic: boolean
}

interface ImageEl {
  id: string; type: 'image'
  src: string
  x: number; y: number        // % of canvas
  size: number                // % of canvas width
}

type DesignEl = TextEl | ImageEl

interface DragState {
  id: string
  startPx: number; startPy: number
  elemX: number;  elemY: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GARMENT_COLORS = [
  '#1a1a1a', '#ffffff', '#c9a87c', '#b08968', '#8b4513',
  '#6b8e8e', '#4a5568', '#8fbc8f', '#d2b48c', '#b0c4de',
  '#f5c6d0', '#a8d8ea', '#8b0000', '#2d5016', '#1e3a5f',
  '#7b2d8b', '#d4a017', '#ff6b35',
]

const TEXT_COLORS = [
  '#ffffff', '#1a1a1a', '#b08968', '#c0392b',
  '#2d5016', '#1e3a5f', '#7b2d8b', '#ff6b35',
]

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  product: Product
  onBack: () => void
}

function ProductCustomizer({ product, onBack }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [garmentColor, setGarmentColor] = useState(product.colors[0])
  const [view, setView] = useState<'front' | 'back'>('front')
  const [designs, setDesigns] = useState<{ front: DesignEl[]; back: DesignEl[] }>({ front: [], back: [] })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [panel, setPanel] = useState<'color' | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Always operate on the current view's elements
  const elements = designs[view]
  const setElements = (updater: DesignEl[] | ((prev: DesignEl[]) => DesignEl[])) =>
    setDesigns((d) => ({
      ...d,
      [view]: typeof updater === 'function' ? updater(d[view]) : updater,
    }))

  const switchView = (v: 'front' | 'back') => {
    setView(v)
    setSelectedId(null)
    setPanel(null)
  }

  const selected = elements.find((e) => e.id === selectedId) ?? null

  // ── Drag ──────────────────────────────────────────────────────────────────

  const onElPointerDown = (e: React.PointerEvent, el: DesignEl) => {
    e.stopPropagation()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setSelectedId(el.id)
    setPanel(null)
    dragRef.current = { id: el.id, startPx: e.clientX, startPy: e.clientY, elemX: el.x, elemY: el.y }
  }

  const onElPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const dx = ((e.clientX - drag.startPx) / rect.width) * 100
    const dy = ((e.clientY - drag.startPy) / rect.height) * 100
    setElements((els) =>
      els.map((el) =>
        el.id === drag.id
          ? { ...el, x: Math.max(0, Math.min(88, drag.elemX + dx)), y: Math.max(0, Math.min(90, drag.elemY + dy)) }
          : el,
      ),
    )
  }

  const onElPointerUp = () => { dragRef.current = null }

  // ── Add / remove ──────────────────────────────────────────────────────────

  const addText = () => {
    const id = `text-${Date.now()}`
    const el: TextEl = { id, type: 'text', content: 'Your Text', x: 28, y: 38, fontSize: 20, color: '#ffffff', bold: false, italic: false }
    setElements((prev) => [...prev, el])
    setSelectedId(id)
    setPanel(null)
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const src = ev.target?.result as string
      const id = `img-${Date.now()}`
      setElements((prev) => [...prev, { id, type: 'image', src, x: 25, y: 28, size: 40 }])
      setSelectedId(id)
      setPanel(null)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const deleteEl = (id: string) => {
    setElements((els) => els.filter((e) => e.id !== id))
    setSelectedId(null)
  }

  const updateEl = (id: string, patch: Partial<DesignEl>) =>
    setElements((els) => els.map((el) => (el.id === id ? ({ ...el, ...patch } as DesignEl) : el)))

  const resetAll = () => {
    setDesigns({ front: [], back: [] })
    setSelectedId(null)
    setGarmentColor(product.colors[0])
    setPanel(null)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[100dvh] bg-[#f2f0ed] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-30 px-4 pt-3 pb-2 sm:px-6">
        <div className="max-w-[860px] mx-auto flex items-center justify-between h-[48px] px-4 bg-white/55 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <button onClick={onBack} className="w-[44px] h-[44px] flex items-center justify-center -ml-2 text-primary active:scale-[0.95] transition-transform" aria-label="Back">
            <ArrowLeft size={20} />
          </button>
          <span className="text-[13px] font-medium text-primary">Customize — {product.name}</span>
          <button onClick={resetAll} className="w-[44px] h-[44px] flex items-center justify-center -mr-2 text-secondary active:scale-[0.95] transition-transform" aria-label="Reset">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto w-full px-4 sm:px-6 pb-32">
        <div className="sm:grid sm:grid-cols-2 sm:gap-8 sm:items-start">

          {/* ── Left: Canvas ── */}
          <div className="flex flex-col gap-2">
            {/* Front / Back tab */}
            <div className="flex bg-white/40 backdrop-blur-xl rounded-xl border border-white/30 p-1 gap-1">
              {(['front', 'back'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className={`relative flex-1 h-[36px] rounded-lg text-[12px] font-medium capitalize transition-all ${view === v ? 'bg-white/80 text-primary shadow-sm' : 'text-secondary'}`}
                >
                  {v} View
                  {designs[v].length > 0 && (
                    <span className="absolute top-1 right-2 w-[6px] h-[6px] bg-accent rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Canvas */}
            <div
              ref={canvasRef}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.06)] select-none"
              onClick={() => { setSelectedId(null); setPanel(null) }}
            >
              {/* Garment */}
              <div className={`absolute inset-0 flex items-center justify-center p-8 sm:p-10 pointer-events-none ${view === 'back' ? '[transform:scaleX(-1)]' : ''}`}>
                <GarmentRenderer type={product.garmentType} color={garmentColor} className="w-full h-full drop-shadow-lg" />
              </div>

              {/* Print-area guide dashes */}
              <div className="absolute inset-[23%_18%_18%_18%] border border-dashed border-white/30 rounded-lg pointer-events-none" />
              <span className="absolute top-[22%] left-1/2 -translate-x-1/2 text-[9px] text-white/40 pointer-events-none tracking-widest uppercase">Print area</span>

              {/* Design elements */}
              {elements.map((el) => (
                <div
                  key={el.id}
                  style={{ left: `${el.x}%`, top: `${el.y}%`, position: 'absolute', touchAction: 'none', zIndex: selectedId === el.id ? 10 : 5 }}
                  className={`cursor-grab active:cursor-grabbing ${selectedId === el.id ? 'outline outline-2 outline-offset-2 outline-accent rounded' : ''}`}
                  onPointerDown={(e) => onElPointerDown(e, el)}
                  onPointerMove={onElPointerMove}
                  onPointerUp={onElPointerUp}
                >
                  {el.type === 'text' ? (
                    <span
                      style={{
                        display: 'block',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                        fontSize: el.fontSize,
                        color: el.color,
                        fontWeight: el.bold ? 700 : 400,
                        fontStyle: el.italic ? 'italic' : 'normal',
                        textShadow: '0 1px 4px rgba(0,0,0,0.35)',
                        lineHeight: 1.2,
                      }}
                    >
                      {el.content}
                    </span>
                  ) : (
                    <img
                      src={el.src}
                      alt="design"
                      draggable={false}
                      style={{ width: `${el.size / 100 * (canvasRef.current?.offsetWidth ?? 300)}px`, display: 'block', pointerEvents: 'none', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                  )}

                  {/* Delete handle on selected */}
                  {selectedId === el.id && (
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => { e.stopPropagation(); deleteEl(el.id) }}
                      className="absolute -top-3 -right-3 w-[22px] h-[22px] bg-danger text-white rounded-full flex items-center justify-center shadow-md z-20"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[10px] text-center text-secondary/70">Tap element to select · Drag to move · Red × to delete</p>
          </div>

          {/* ── Right: Controls ── */}
          <div className="flex flex-col gap-3 mt-3 sm:mt-0">
            {/* Tool buttons */}
            <div className="grid grid-cols-3 gap-2">
              <ToolBtn
                icon={<Palette size={18} />} label="Color"
                active={panel === 'color'}
                onClick={() => { setPanel(panel === 'color' ? null : 'color'); setSelectedId(null) }}
              />
              <ToolBtn icon={<Type size={18} />} label="Add Text" active={false} onClick={addText} />
              <ToolBtn icon={<ImagePlus size={18} />} label="Upload" active={false} onClick={() => fileRef.current?.click()} />
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />

            {/* ── Garment color panel ── */}
            {panel === 'color' && (
              <Panel title="Garment Color">
                <div className="grid grid-cols-6 gap-2">
                  {GARMENT_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setGarmentColor(c)}
                      className={`aspect-square rounded-xl border-2 transition-all active:scale-[0.9] ${garmentColor === c ? 'border-accent scale-110 shadow-[0_0_0_2px_rgba(176,137,104,0.3)]' : 'border-white shadow-sm'}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/5">
                  <input type="color" value={garmentColor} onChange={(e) => setGarmentColor(e.target.value)} className="w-[44px] h-[44px] rounded-xl cursor-pointer border-2 border-white" />
                  <span className="text-[12px] text-secondary font-mono uppercase">{garmentColor}</span>
                </div>
              </Panel>
            )}

            {/* ── Text element controls ── */}
            {selected?.type === 'text' && (
              <Panel title="Edit Text" onDelete={() => deleteEl(selected.id)}>
                {/* Content input */}
                <input
                  value={selected.content}
                  onChange={(e) => updateEl(selected.id, { content: e.target.value })}
                  className="h-[46px] w-full bg-white/60 rounded-xl border border-white/40 px-4 text-[14px] text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                  placeholder="Your text..."
                />

                {/* Font size + bold + italic */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-secondary uppercase tracking-wider mr-1 flex-none">Size</span>
                  <button onClick={() => updateEl(selected.id, { fontSize: Math.max(10, (selected as TextEl).fontSize - 2) })} className={smBtn}>
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-[13px] font-semibold text-primary">{(selected as TextEl).fontSize}</span>
                  <button onClick={() => updateEl(selected.id, { fontSize: Math.min(72, (selected as TextEl).fontSize + 2) })} className={smBtn}>
                    <Plus size={12} />
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => updateEl(selected.id, { bold: !(selected as TextEl).bold })}
                    className={`w-[38px] h-[38px] flex items-center justify-center rounded-xl border transition-all ${(selected as TextEl).bold ? 'bg-primary text-white border-primary' : 'bg-white/50 text-secondary border-white/40'}`}
                  >
                    <Bold size={15} />
                  </button>
                  <button
                    onClick={() => updateEl(selected.id, { italic: !(selected as TextEl).italic })}
                    className={`w-[38px] h-[38px] flex items-center justify-center rounded-xl border transition-all ${(selected as TextEl).italic ? 'bg-primary text-white border-primary' : 'bg-white/50 text-secondary border-white/40'}`}
                  >
                    <Italic size={15} />
                  </button>
                </div>

                {/* Text color */}
                <div>
                  <p className="text-[11px] text-secondary uppercase tracking-wider mt-3 mb-2">Text Color</p>
                  <div className="flex flex-wrap gap-2">
                    {TEXT_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => updateEl(selected.id, { color: c })}
                        className={`w-[34px] h-[34px] rounded-xl border-2 transition-all active:scale-[0.9] ${(selected as TextEl).color === c ? 'border-accent scale-110' : 'border-white shadow-sm'}`}
                        style={{ background: c }}
                      />
                    ))}
                    <input
                      type="color"
                      value={(selected as TextEl).color}
                      onChange={(e) => updateEl(selected.id, { color: e.target.value })}
                      className="w-[34px] h-[34px] rounded-xl border-2 border-white cursor-pointer shadow-sm"
                    />
                  </div>
                </div>
              </Panel>
            )}

            {/* ── Image element controls ── */}
            {selected?.type === 'image' && (
              <Panel title="Image Size" onDelete={() => deleteEl(selected.id)}>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateEl(selected.id, { size: Math.max(10, (selected as ImageEl).size - 5) })} className={smBtn}>
                    <Minus size={14} />
                  </button>
                  <div className="flex-1 relative h-[6px] bg-white/60 rounded-full border border-white/40">
                    <div
                      className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all"
                      style={{ width: `${((selected as ImageEl).size - 10) / 70 * 100}%` }}
                    />
                  </div>
                  <button onClick={() => updateEl(selected.id, { size: Math.min(80, (selected as ImageEl).size + 5) })} className={smBtn}>
                    <Plus size={14} />
                  </button>
                </div>
                <p className="text-[11px] text-center text-secondary mt-1">{(selected as ImageEl).size}% canvas width</p>
              </Panel>
            )}

            {/* Hint when nothing active */}
            {elements.length === 0 && panel === null && (
              <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/20 px-5 py-6 text-center">
                <p className="text-[13px] text-secondary">
                  Editing the <span className="font-semibold text-primary capitalize">{view}</span> view.
                  Add text or an image — it won't appear on the other side.
                </p>
              </div>
            )}

            {/* Elements list */}
            {elements.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] text-secondary uppercase tracking-wider">Layers — <span className="capitalize">{view}</span></p>
                {[...elements].reverse().map((el) => (
                  <button
                    key={el.id}
                    onClick={() => { setSelectedId(el.id); setPanel(null) }}
                    className={`flex items-center gap-3 h-[44px] px-3 rounded-xl border text-[12px] font-medium text-left transition-all ${selectedId === el.id ? 'bg-accent/10 border-accent/20 text-accent-dark' : 'bg-white/40 border-white/30 text-primary'}`}
                  >
                    {el.type === 'text' ? <Type size={14} /> : <ImagePlus size={14} />}
                    <span className="flex-1 truncate">{el.type === 'text' ? (el as TextEl).content : 'Image'}</span>
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => { e.stopPropagation(); deleteEl(el.id) }}
                      className="w-[28px] h-[28px] flex items-center justify-center rounded-lg text-secondary hover:text-danger transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2">
        <div className="max-w-[860px] mx-auto flex items-center gap-3 p-2 bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col px-3">
            <span className="text-[10px] text-secondary uppercase tracking-wider">Total</span>
            <span className="text-[18px] font-bold text-primary">${product.price}</span>
          </div>
          <button
            onClick={() => {
              addItem(product, product.sizes[0], garmentColor, 1, true)
              setAdded(true)
              setTimeout(() => setAdded(false), 1500)
            }}
            className={`flex-1 flex items-center justify-center gap-2 h-[48px] text-[13px] font-semibold uppercase tracking-wider rounded-xl active:scale-[0.97] transition-all ${added ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}
          >
            {added ? <><Check size={15} strokeWidth={2.5} /> Added!</> : <><ShoppingBag size={16} /> Add Custom to Cart</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Small shared pieces ────────────────────────────────────────────────────────

const smBtn = 'w-[38px] h-[38px] flex items-center justify-center rounded-xl bg-white/50 border border-white/40 text-primary active:scale-[0.9] transition-transform'

function ToolBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 h-[62px] rounded-xl border text-[11px] font-medium transition-all active:scale-[0.95] ${active ? 'bg-accent/10 border-accent/20 text-accent-dark' : 'bg-white/50 backdrop-blur-xl border-white/40 text-primary'}`}
    >
      {icon}
      {label}
    </button>
  )
}

function Panel({ title, children, onDelete }: { title: string; children: React.ReactNode; onDelete?: () => void }) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary">{title}</p>
        {onDelete && (
          <button onClick={onDelete} className="w-[30px] h-[30px] flex items-center justify-center rounded-lg text-danger/70 hover:text-danger hover:bg-danger/10 transition-colors">
            <Trash2 size={14} />
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

export default ProductCustomizer
