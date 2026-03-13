import { useState, useEffect } from 'react'
import type { Product } from './types/product'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import CustomDesignBanner from './components/CustomDesignBanner'
import Footer from './components/Footer'
import ProductDetails from './components/ProductDetails'
import ProductCustomizer from './components/ProductCustomizer'
import AllProducts from './components/AllProducts'
import AdminLogin from './components/admin/AdminLogin'
import AddProduct from './components/admin/AddProduct'

type View = 'home' | 'product-details' | 'customizer' | 'all-products' | 'admin-login' | 'admin-add'

function App() {
  const [view, setView] = useState<View>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [isAdminAuthed, setIsAdminAuthed] = useState(false)

  // Allow navigating to admin via /#admin in the browser
  useEffect(() => {
    if (window.location.hash === '#admin') {
      window.location.hash = ''
      openAdmin()
    }
  }, [])

  const goHome = () => {
    setView('home')
    setSelectedProduct(null)
    setSelectedCategory(undefined)
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

  const openAllProducts = (category?: string) => {
    setSelectedCategory(category)
    setView('all-products')
    window.scrollTo(0, 0)
  }

  const openAdmin = () => {
    if (isAdminAuthed) {
      setView('admin-add')
    } else {
      setView('admin-login')
    }
    window.scrollTo(0, 0)
  }

  const handleAdminLogin = () => {
    setIsAdminAuthed(true)
    setView('admin-add')
    window.scrollTo(0, 0)
  }

  const handleAdminLogout = () => {
    setIsAdminAuthed(false)
    goHome()
  }

  if (view === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} onBack={goHome} />
  }

  if (view === 'admin-add' && isAdminAuthed) {
    return <AddProduct onBack={goHome} onLogout={handleAdminLogout} />
  }

  if (view === 'all-products') {
    return (
      <AllProducts
        initialCategory={selectedCategory}
        onBack={goHome}
        onSelectProduct={openProduct}
      />
    )
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
        <Categories onSelectCategory={(cat) => openAllProducts(cat)} />
        <FeaturedProducts onSelectProduct={openProduct} onViewAll={() => openAllProducts()} />
        <CustomDesignBanner onCustomize={openCustomizer} />
      </main>
      <Footer onAdminAccess={openAdmin} />
    </>
  )
}

export default App
