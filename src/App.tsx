import { useState } from 'react'
import type { Product } from './types/product'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import CustomDesignBanner from './components/CustomDesignBanner'
import Footer from './components/Footer'
import ProductDetails from './components/ProductDetails'
import ProductCustomizer from './components/ProductCustomizer'

type View = 'home' | 'product-details' | 'customizer'

function App() {
  const [view, setView] = useState<View>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const goHome = () => {
    setView('home')
    setSelectedProduct(null)
    window.scrollTo(0, 0)
  }

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setView('product-details')
    window.scrollTo(0, 0)
  }

  const openCustomizer = (product: Product) => {
    setSelectedProduct(product)
    setView('customizer')
    window.scrollTo(0, 0)
  }

  if (view === 'product-details' && selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={goHome}
        onCustomize={openCustomizer}
      />
    )
  }

  if (view === 'customizer' && selectedProduct) {
    return (
      <ProductCustomizer
        product={selectedProduct}
        onBack={() => {
          setView('product-details')
          window.scrollTo(0, 0)
        }}
      />
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts onSelectProduct={openProduct} />
        <CustomDesignBanner onCustomize={openCustomizer} />
      </main>
      <Footer />
    </>
  )
}

export default App
