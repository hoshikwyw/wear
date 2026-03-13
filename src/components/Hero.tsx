function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 pt-14 pb-10 sm:py-20 lg:py-28 sm:min-h-[70dvh] lg:min-h-[85vh]">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[280px] sm:w-[400px] lg:w-[500px] aspect-square rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/10 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-[300px] sm:w-[450px] lg:w-[600px] aspect-square rounded-full bg-gradient-to-br from-rose-200/10 to-amber-100/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[680px] mx-auto text-center">
        {/* Tag */}
        <span className="inline-block text-[10px] sm:text-[11px] font-medium tracking-[2px] uppercase text-accent mb-5 sm:mb-6 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/15 backdrop-blur-md">
          New Collection 2026
        </span>

        {/* Title */}
        <h1 className="font-display text-[36px] sm:text-[48px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.06] tracking-tight text-primary mb-4 sm:mb-6">
          Wear What<br />
          <span className="bg-gradient-to-r from-accent via-[#c4956d] to-accent-dark bg-clip-text text-transparent">
            Defines You
          </span>
        </h1>

        {/* Subtitle — short for mobile */}
        <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed text-secondary font-light mb-8 sm:mb-10 max-w-[400px] mx-auto px-2">
          Premium tops, hoodies & tees for every style.
        </p>

        {/* CTA — stacked on mobile, large touch targets */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 items-center justify-center px-4 sm:px-0">
          <a
            href="#new-arrivals"
            className="w-full sm:w-auto inline-flex items-center justify-center h-[50px] sm:h-[46px] px-8 text-[14px] sm:text-[13px] font-medium bg-primary text-white rounded-full hover:bg-primary-light active:scale-[0.97] transition-all shadow-[0_2px_10px_rgba(27,27,27,0.2)]"
          >
            Shop Now
          </a>
          <a
            href="#categories"
            className="w-full sm:w-auto inline-flex items-center justify-center h-[50px] sm:h-[46px] px-8 text-[14px] sm:text-[13px] font-medium text-primary bg-white/55 backdrop-blur-xl border border-white/40 rounded-full hover:bg-white/75 active:scale-[0.97] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            Explore
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
