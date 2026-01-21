import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AdminDashboard } from './pages/AdminDashboard';

// Placeholder Pages
const Home = () => (
    <div className="container">
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Bienvenido a <br /><span className="text-gradient">TechStore Premium</span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                Descubre la última tecnología con la mejor experiencia de compra del mercado.
            </p>
            <div>
                <Link to="/products" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
                    Explorar Catálogo
                </Link>
            </div>
        </div>
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Catalog />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<OrderSuccess />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
