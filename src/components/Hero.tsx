function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 max-md:min-h-[80vh] max-md:py-12">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/10 blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-300/10 to-pink-300/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-green-300/10 to-cyan-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full text-center">
        <div className="max-w-[720px] mx-auto">
          {/* Glass tag */}
          <span className="inline-block text-[11px] font-medium tracking-[2px] uppercase text-accent mb-6 px-5 py-2 rounded-full bg-accent/8 border border-accent/15 backdrop-blur-md">
            New Collection 2026
          </span>

          <h1 className="font-display text-[76px] max-lg:text-[56px] max-md:text-[40px] font-semibold leading-[1.05] mb-6 text-primary tracking-tight">
            Wear What<br />
            <span className="bg-gradient-to-r from-[#0071e3] via-[#af52de] to-[#ff6482] bg-clip-text text-transparent">
              Defines You
            </span>
          </h1>

          <p className="text-[19px] max-md:text-base leading-relaxed text-secondary mb-10 max-w-[480px] mx-auto font-light">
            Premium T-shirts, hoodies & top-wear crafted for every style and every body.
          </p>

          <div className="flex gap-4 justify-center max-md:flex-col max-md:items-center">
            <a
              href="#new-arrivals"
              className="inline-flex items-center justify-center px-8 py-3 text-[14px] font-medium bg-accent text-white rounded-full hover:brightness-110 transition-all shadow-[0_2px_12px_rgba(0,113,227,0.3)] hover:shadow-[0_4px_20px_rgba(0,113,227,0.4)]"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-8 py-3 text-[14px] font-medium text-accent bg-white/60 backdrop-blur-xl border border-white/40 rounded-full hover:bg-white/80 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              Explore
            </a>
          </div>
        </div>

        {/* Glass card decoration */}
        <div className="mt-16 max-md:mt-10 mx-auto max-w-[560px]">
          <div className="relative rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] p-8 max-md:p-5">
            <div className="flex items-center justify-between text-sm text-secondary">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(52,199,89,0.5)]" />
                Free shipping on orders over $50
              </span>
              <span className="text-xs bg-white/60 backdrop-blur px-3 py-1 rounded-full border border-white/40">
                New
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
