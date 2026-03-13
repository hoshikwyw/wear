const categories = [
  { name: 'T-Shirts', description: 'Essential everyday comfort', icon: '👕', count: 120 },
  { name: 'Hoodies', description: 'Cozy warmth, bold style', icon: '🧥', count: 85 },
  { name: 'Tops & Blouses', description: 'Elegant & versatile', icon: '👚', count: 96 },
  { name: 'Sweatshirts', description: 'Casual weekend vibes', icon: '🧶', count: 64 },
]

function Categories() {
  return (
    <section className="py-24 max-md:py-14" id="categories">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-[34px] max-md:text-[26px] font-semibold text-primary tracking-tight mb-3">
            Shop by Category
          </h2>
          <p className="text-secondary text-[17px] font-light max-w-[420px] mx-auto">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group flex flex-col items-center text-center px-6 py-10 rounded-2xl bg-white/50 backdrop-blur-2xl border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-white/70 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-[44px] mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
              <h3 className="font-sans text-[17px] font-semibold text-primary mb-1.5">{cat.name}</h3>
              <p className="text-[13px] text-secondary mb-4">{cat.description}</p>
              <span className="text-[11px] font-medium text-accent uppercase tracking-wider bg-accent/8 px-3 py-1 rounded-full">
                {cat.count} items
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
