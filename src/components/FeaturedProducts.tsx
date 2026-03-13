import ProductCard from './ProductCard'
import type { Product } from './ProductCard'

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Cotton Crew Tee',
    price: 29,
    tag: 'Best Seller',
    colors: ['#1a1a1a', '#ffffff', '#6b8e8e', '#c9a87c'],
    category: 'T-Shirts',
  },
  {
    id: 2,
    name: 'Oversized Graphic Hoodie',
    price: 69,
    originalPrice: 89,
    colors: ['#2d2d2d', '#4a5568', '#8b6914'],
    category: 'Hoodies',
  },
  {
    id: 3,
    name: 'Relaxed Fit Crop Top',
    price: 35,
    tag: 'New',
    colors: ['#ffffff', '#f5c6d0', '#a8d8ea'],
    category: 'Tops',
  },
  {
    id: 4,
    name: 'Essential Zip-Up Hoodie',
    price: 59,
    colors: ['#1a1a1a', '#3d3d3d', '#8b4513'],
    category: 'Hoodies',
  },
  {
    id: 5,
    name: 'Vintage Wash Tee',
    price: 34,
    originalPrice: 42,
    colors: ['#8fbc8f', '#d2b48c', '#b0c4de'],
    category: 'T-Shirts',
  },
  {
    id: 6,
    name: 'Ribbed Knit Long Sleeve',
    price: 45,
    tag: 'New',
    colors: ['#1a1a1a', '#f5f0eb', '#8b0000'],
    category: 'Tops',
  },
  {
    id: 7,
    name: 'Heavyweight Pullover',
    price: 75,
    colors: ['#2d2d2d', '#4a4a4a'],
    category: 'Sweatshirts',
  },
  {
    id: 8,
    name: 'Slim Fit V-Neck Tee',
    price: 25,
    originalPrice: 32,
    colors: ['#ffffff', '#1a1a1a', '#708090', '#c9a87c'],
    category: 'T-Shirts',
  },
]

function FeaturedProducts() {
  return (
    <section className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:py-24 px-4 sm:px-6" id="new-arrivals">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <h2 className="font-display text-[24px] sm:text-[28px] lg:text-[34px] font-semibold text-primary tracking-tight mb-2">
            New Arrivals
          </h2>
          <p className="text-secondary text-[14px] sm:text-[16px] font-light">
            Fresh styles, just dropped
          </p>
        </div>

        {/* Grid — 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA — large button */}
        <div className="text-center mt-10 sm:mt-14 px-4 sm:px-0">
          <a
            href="#"
            className="inline-flex items-center justify-center w-full sm:w-auto h-[50px] sm:h-[46px] px-8 text-[14px] sm:text-[13px] font-medium text-primary bg-white/55 backdrop-blur-xl border border-white/40 rounded-full active:scale-[0.97] sm:hover:bg-white/75 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
