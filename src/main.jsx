import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <ProductProvider>
                <OrderProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </OrderProvider>
            </ProductProvider>
        </AuthProvider>
    </React.StrictMode>,
)
