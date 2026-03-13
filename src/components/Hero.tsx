function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[500px] max-h-[800px] flex items-center overflow-hidden max-md:h-[70vh] max-md:min-h-[420px]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-[#3d3d3d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(201,168,124,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(201,168,124,0.1)_0%,transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-[600px]">
          <span className="inline-block text-xs font-medium tracking-[2px] uppercase text-accent mb-5 px-4 py-1.5 border border-accent rounded-sm">
            New Collection 2026
          </span>
          <h1 className="font-display text-[72px] max-md:text-[44px] font-semibold leading-[1.05] mb-6 text-white">
            Wear What<br />
            <em className="text-accent">Defines You</em>
          </h1>
          <p className="text-lg max-md:text-base leading-relaxed text-white/70 mb-10 max-w-[460px]">
            Premium T-shirts, hoodies & top-wear crafted for every style and every body.
          </p>
          <div className="flex gap-4 max-md:flex-col">
            <a
              href="#new-arrivals"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-wider bg-accent border-2 border-accent text-white rounded-sm hover:bg-accent-dark hover:border-accent-dark transition-all"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-wider bg-transparent border-2 border-white/60 text-white rounded-sm hover:bg-white/10 transition-all"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
