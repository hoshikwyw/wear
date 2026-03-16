import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import CartDrawer from './components/CartDrawer.tsx'
import Checkout from './components/Checkout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
      <CartDrawer />
      <Checkout />
    </CartProvider>
  </StrictMode>,
)
