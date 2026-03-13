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
    <section className="py-20 max-md:py-12 bg-surface" id="new-arrivals">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl max-md:text-[28px] font-medium text-primary mb-3">
            New Arrivals
          </h2>
          <p className="text-muted max-w-[500px] mx-auto">
            Fresh styles just dropped — be the first to wear them
          </p>
        </div>

        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-6 max-md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-wider bg-transparent border-2 border-primary text-primary rounded-sm hover:bg-primary hover:text-white transition-all"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
