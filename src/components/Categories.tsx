const categories = [
  { name: 'T-Shirts', description: 'Essential everyday comfort', icon: '👕', count: 120 },
  { name: 'Hoodies', description: 'Cozy warmth, bold style', icon: '🧥', count: 85 },
  { name: 'Tops & Blouses', description: 'Elegant & versatile', icon: '👚', count: 96 },
  { name: 'Sweatshirts', description: 'Casual weekend vibes', icon: '🧶', count: 64 },
]

function Categories() {
  return (
    <section className="py-20 max-md:py-12" id="categories">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl max-md:text-[28px] font-medium text-primary mb-3">
            Shop by Category
          </h2>
          <p className="text-muted max-w-[500px] mx-auto">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="flex flex-col items-center text-center px-6 py-10 bg-surface border border-border-light rounded hover:border-accent hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <span className="text-5xl mb-4">{cat.icon}</span>
              <h3 className="font-sans text-lg font-semibold text-primary mb-2">{cat.name}</h3>
              <p className="text-sm text-muted mb-4">{cat.description}</p>
              <span className="text-xs font-medium text-accent-dark uppercase tracking-wider">
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
