import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import CartDrawer from './components/CartDrawer.tsx'
import Checkout from './components/Checkout.tsx'
import AuthModal from './components/AuthModal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <CartDrawer />
        <Checkout />
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
