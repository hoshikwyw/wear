import { Pen } from 'lucide-react'

function CustomDesignBanner() {
  return (
    <section className="py-20 max-md:py-12 bg-primary text-white">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-12 max-md:flex-col max-md:text-center">
        <div className="max-w-[500px]">
          <span className="inline-block text-xs font-medium tracking-[2px] uppercase text-accent mb-4">
            Coming Soon
          </span>
          <h2 className="font-display text-[42px] max-md:text-[32px] font-medium text-white mb-4">
            Design Your Own
          </h2>
          <p className="text-base leading-relaxed text-white/70 mb-8">
            Create custom prints, add stickers, and make clothing that's uniquely yours.
            Our design studio is launching soon.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-wider bg-accent border-2 border-accent text-white rounded-sm hover:bg-accent-dark hover:border-accent-dark transition-all cursor-pointer">
            Get Notified
          </button>
        </div>

        <div className="shrink-0 max-md:hidden">
          <div className="w-[200px] h-[200px] rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
            <Pen size={80} strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomDesignBanner
