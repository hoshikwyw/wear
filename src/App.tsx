import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import CustomDesignBanner from './components/CustomDesignBanner'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <CustomDesignBanner />
      </main>
      <Footer />
    </>
  )
}

export default App
