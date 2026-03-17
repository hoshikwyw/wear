import { useState, useEffect } from 'react'
import type { Product } from './types/product'
import type { AdminCategory } from './types/admin'
import { supabase } from './lib/supabase'
import { rowToProduct } from './lib/productMapper'
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
import AdminDashboard from './components/admin/AdminDashboard'

type View = 'home' | 'product-details' | 'customizer' | 'all-products' | 'admin-login' | 'admin'

function App() {
  const [view, setView] = useState<View>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [isAdminAuthed, setIsAdminAuthed] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<AdminCategory[]>([])
  const [storeLoading, setStoreLoading] = useState(true)

  useEffect(() => {
    async function loadStore() {
      const [{ data: prodRows }, { data: catRows }] = await Promise.all([
        supabase.from('products').select('*').eq('active', true).order('id'),
        supabase.from('categories').select('*').eq('active', true).order('id'),
      ])
      setProducts((prodRows ?? []).map(rowToProduct))
      setCategories((catRows ?? []).map((r) => ({ id: r.id, name: r.name, icon: r.icon, active: r.active })))
      setStoreLoading(false)
    }
    loadStore()
  }, [])

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
    setView(isAdminAuthed ? 'admin' : 'admin-login')
    window.scrollTo(0, 0)
  }

  const handleAdminLogin = () => {
    setIsAdminAuthed(true)
    setView('admin')
    window.scrollTo(0, 0)
  }

  const handleAdminLogout = () => {
    setIsAdminAuthed(false)
    goHome()
  }

  if (view === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} onBack={goHome} />
  }

  if (view === 'admin' && isAdminAuthed) {
    return <AdminDashboard onLogout={handleAdminLogout} onBackToStore={goHome} />
  }

  if (view === 'all-products') {
    return (
      <AllProducts
        products={products}
        categories={categories}
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

  const categoriesWithCount = categories.map((c) => ({
    name: c.name,
    icon: c.icon,
    count: products.filter((p) => p.category === c.name).length,
  }))

  return (
    <>
      <Navbar onAdminAccess={openAdmin} />
      <main>
        <Hero />
        <Categories
          categories={categoriesWithCount}
          loading={storeLoading}
          onSelectCategory={(cat) => openAllProducts(cat)}
        />
        <FeaturedProducts
          products={products}
          loading={storeLoading}
          onSelectProduct={openProduct}
          onViewAll={() => openAllProducts()}
        />
        <CustomDesignBanner products={products} onCustomize={openCustomizer} />
      </main>
      <Footer onAdminAccess={openAdmin} />
    </>
  )
}

export default App
