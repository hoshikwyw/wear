import { Pen, Sparkles, Palette } from 'lucide-react'

function CustomDesignBanner() {
  return (
    <section className="py-24 max-md:py-14">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary-light to-[#3a3a4a] p-14 max-md:p-8">
          {/* Glass refraction decorations */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-orange-500/10 to-pink-500/10 blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 flex items-center justify-between gap-12 max-md:flex-col max-md:text-center">
            <div className="max-w-[480px]">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[2px] uppercase text-white/90 mb-5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                <Sparkles size={12} />
                Coming Soon
              </span>
              <h2 className="font-display text-[38px] max-md:text-[28px] font-semibold text-white tracking-tight mb-4">
                Design Your Own
              </h2>
              <p className="text-[16px] leading-relaxed text-white/60 mb-8 font-light">
                Create custom prints, add stickers, and make clothing that's uniquely yours.
                Our design studio is launching soon.
              </p>
              <button className="inline-flex items-center justify-center px-7 py-3 text-[14px] font-medium bg-white/15 backdrop-blur-xl text-white rounded-full border border-white/20 hover:bg-white/25 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.1)] cursor-pointer">
                Get Notified
              </button>
            </div>

            <div className="shrink-0 max-md:hidden">
              <div className="relative">
                <div className="w-[180px] h-[180px] rounded-3xl bg-white/8 backdrop-blur-2xl border border-white/15 flex items-center justify-center text-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] rotate-6">
                  <Pen size={60} strokeWidth={1} />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.15)] -rotate-12">
                  <Palette size={24} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomDesignBanner
