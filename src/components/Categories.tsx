interface CategoryItem {
  name: string
  icon: string
  count: number
}

interface Props {
  categories: CategoryItem[]
  loading: boolean
  onSelectCategory?: (category: string) => void
}

function Categories({ categories, loading, onSelectCategory }: Props) {
  const handleClick = (name: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onSelectCategory?.(name)
  }

  if (loading) {
    return (
      <section className="pt-2 pb-4 sm:pt-4 sm:pb-6 lg:py-16">
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto mb-5 sm:mb-8">
          <h2 className="font-display text-[20px] sm:text-[24px] lg:text-[30px] font-semibold text-primary tracking-tight">
            Categories
          </h2>
        </div>
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[72px] h-[72px] rounded-2xl bg-white/40 animate-pulse sm:hidden" />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="hidden sm:block h-[64px] w-[160px] rounded-2xl bg-white/40 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="pt-2 pb-4 sm:pt-4 sm:pb-6 lg:py-16" id="categories">
      <div className="px-4 sm:px-6 max-w-[1200px] mx-auto mb-5 sm:mb-8">
        <h2 className="font-display text-[20px] sm:text-[24px] lg:text-[30px] font-semibold text-primary tracking-tight">
          Categories
        </h2>
      </div>

      <div className="px-4 sm:px-6 max-w-[1200px] mx-auto">
        {/* Mobile: horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:hidden -mx-4 px-4"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={handleClick(cat.name)}
              className="flex-none snap-start flex flex-col items-center w-[88px] active:scale-[0.95] transition-transform"
            >
              <div className="w-[72px] h-[72px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] flex items-center justify-center mb-2">
                <span className="text-[32px]">{cat.icon}</span>
              </div>
              <span className="text-[12px] font-medium text-primary text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Tablet+: pill buttons */}
        <div className="hidden sm:flex flex-wrap gap-3 lg:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={handleClick(cat.name)}
              className="group flex items-center gap-3 px-5 lg:px-6 py-3.5 lg:py-4 rounded-2xl bg-white/50 backdrop-blur-2xl border border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-white/70 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] active:scale-[0.97] transition-all duration-200"
            >
              <span className="text-[28px] lg:text-[32px] group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div className="flex flex-col text-left">
                <span className="text-[14px] lg:text-[15px] font-semibold text-primary leading-tight">{cat.name}</span>
                <span className="text-[11px] lg:text-[12px] text-secondary">{cat.count} {cat.count === 1 ? 'item' : 'items'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
