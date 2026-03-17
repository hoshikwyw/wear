import { useState, useEffect } from 'react'
import { Sparkles, Palette, Type, ImagePlus, ArrowRight } from 'lucide-react'
import type { GarmentType } from '../types/product'
import GarmentRenderer from './garments/GarmentRenderer'

const PREVIEW_COLORS = [
  '#1a1a1a', '#c9a87c', '#6b8e8e', '#4a5568',
  '#ffffff', '#f5c6d0', '#8fbc8f', '#8b4513',
]

const GARMENT_TYPES: { key: GarmentType; label: string }[] = [
  { key: 'tshirt',     label: 'Tee'     },
  { key: 'hoodie',     label: 'Hoodie'  },
  { key: 'sweatshirt', label: 'Sweater' },
  { key: 'crop-top',   label: 'Crop'    },
]

const FEATURES = [
  { icon: Palette,   label: 'Any color'    },
  { icon: Type,      label: 'Custom text'  },
  { icon: ImagePlus, label: 'Upload art'   },
]

interface Props {
  onStartDesigning?: () => void
  onShopNow?: () => void
}

function Hero({ onStartDesigning, onShopNow }: Props) {
  const [color, setColor] = useState(PREVIEW_COLORS[0])
  const [type,  setType]  = useState<GarmentType>('tshirt')
  const [autoPlay, setAutoPlay] = useState(true)
  const [fading, setFading]     = useState(false)

  // Auto-cycle colors
  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setColor((c) => {
          const i = PREVIEW_COLORS.indexOf(c)
          return PREVIEW_COLORS[(i + 1) % PREVIEW_COLORS.length]
        })
        setFading(false)
      }, 200)
    }, 2000)
    return () => clearInterval(id)
  }, [autoPlay])

  const pickColor = (c: string) => {
    setAutoPlay(false)
    setFading(true)
    setTimeout(() => { setColor(c); setFading(false) }, 150)
  }

  const isLight = color === '#ffffff' || color === '#f5c6d0' || color === '#8fbc8f' || color === '#c9a87c' || color === '#d2b48c'

  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-20">

      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[320px] sm:w-[480px] aspect-square rounded-full bg-gradient-to-br from-amber-200/25 to-orange-200/10 blur-3xl" />
        <div className="absolute bottom-0 -right-24 w-[280px] sm:w-[440px] aspect-square rounded-full bg-gradient-to-br from-rose-200/12 to-amber-100/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] aspect-square rounded-full bg-gradient-to-br from-white/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── LEFT — Copy ── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium tracking-[2.5px] uppercase text-accent mb-5 sm:mb-6 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/15 backdrop-blur-md">
              <Sparkles size={11} /> Design Studio
            </span>

            {/* Heading */}
            <h1 className="font-display text-[38px] sm:text-[52px] lg:text-[58px] xl:text-[64px] font-semibold leading-[1.04] tracking-tight text-primary mb-5 sm:mb-6">
              Design clothes<br />
              that are<br />
              <span className="bg-gradient-to-r from-accent via-[#c49a6c] to-accent-dark bg-clip-text text-transparent">
                uniquely yours.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-secondary font-light mb-7 sm:mb-8 max-w-[440px] mx-auto lg:mx-0">
              Pick your garment, set your colors, add text or upload artwork — wear exactly what you imagine.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 sm:mb-10">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 h-[32px] px-3 rounded-full bg-white/55 backdrop-blur-xl border border-white/40 text-[12px] font-medium text-primary/65 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                >
                  <Icon size={12} className="text-accent" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={onStartDesigning}
                className="inline-flex items-center justify-center gap-2 h-[52px] sm:h-[48px] px-8 text-[14px] sm:text-[13px] font-semibold bg-primary text-white rounded-full hover:bg-primary-light active:scale-[0.97] transition-all shadow-[0_4px_16px_rgba(27,27,27,0.22)]"
              >
                Start Designing
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center h-[52px] sm:h-[48px] px-8 text-[14px] sm:text-[13px] font-medium text-primary bg-white/55 backdrop-blur-xl border border-white/40 rounded-full hover:bg-white/75 active:scale-[0.97] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                Browse Collection
              </button>
            </div>
          </div>

          {/* ── RIGHT — Interactive preview ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[360px] sm:max-w-[400px]">

              {/* Garment card */}
              <div className="relative aspect-square bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-[0_8px_48px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.6)] flex items-center justify-center p-10 overflow-hidden">

                {/* Dynamic glow matching active color */}
                <div
                  className="absolute inset-0 transition-all duration-700 opacity-25"
                  style={{ background: `radial-gradient(ellipse at 60% 40%, ${color} 0%, transparent 70%)` }}
                />

                {/* Garment SVG */}
                <div className={`relative z-10 w-full h-full transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}>
                  <GarmentRenderer
                    type={type}
                    color={color}
                    overlayText="YOURS"
                    textColor={isLight ? '#1a1a1a' : '#ffffff'}
                    textSize="md"
                    className="w-full h-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                  />
                </div>

                {/* Garment type selector — top-left */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
                  {GARMENT_TYPES.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setType(t.key)}
                      className={`h-[26px] px-2.5 rounded-lg text-[10px] font-semibold transition-all active:scale-[0.95] ${
                        type === t.key
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white/65 backdrop-blur-md text-primary/55 border border-white/50 hover:bg-white/85 hover:text-primary'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* "Try it" hint — top-right */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="flex items-center gap-1 text-[9px] font-medium text-secondary/60 bg-white/50 backdrop-blur-md border border-white/40 px-2 py-1 rounded-full">
                    <Sparkles size={8} className="text-accent" /> Interactive
                  </span>
                </div>
              </div>

              {/* Color swatches */}
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap px-2">
                {PREVIEW_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => pickColor(c)}
                    title={c}
                    className={`w-[28px] h-[28px] rounded-full transition-all duration-200 active:scale-90 ${
                      color === c
                        ? 'ring-2 ring-offset-2 ring-accent scale-110 shadow-sm'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    } ${c === '#ffffff' ? 'border border-black/10' : ''}`}
                    style={{ background: c }}
                  />
                ))}
              </div>

              {/* Instruction hint */}
              <p className="text-center text-[11px] text-secondary/55 mt-3">
                Click a swatch or garment type to preview · <button onClick={onStartDesigning} className="text-accent-dark underline underline-offset-2">Full editor →</button>
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
