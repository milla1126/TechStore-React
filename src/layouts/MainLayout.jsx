import { Outlet, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartSidebar } from '../features/cart/CartSidebar';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export const MainLayout = () => {
    const { setIsCartOpen, getCartCount } = useCart();

    return (
        <div className="app">
            <ThemeSwitcher />
            <CartSidebar />
            <header style={{
                height: 'var(--header-height)',
                borderBottom: '1px solid var(--color-bg-surface)',
                display: 'flex',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                width: '100%',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 10
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>TechStore</Link>
                    <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <Link to="/" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Inicio</Link>
                        <Link to="/products?filter=offers" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Ofertas</Link>
                        <Link to="/products" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Categorías</Link>
                        <Link to="/products?filter=combos" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Paquetes</Link>

                        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-bg-surface)', margin: '0 0.5rem' }}></div>

                        <Link to="/profile" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Perfil</Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            style={{
                                color: 'var(--color-text-primary)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>Carrito</span>
                            <span style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                padding: '0.1rem 0.5rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem'
                            }}>
                                {getCartCount()}
                            </span>
                        </button>
                    </nav>
                </div>
            </header>

            <main style={{ paddingTop: 'var(--header-height)', minHeight: 'calc(100vh - var(--header-height))' }}>
                <Outlet />
            </main>

            <footer style={{
                borderTop: '1px solid var(--color-bg-surface)',
                padding: '2rem 0',
                marginTop: '2rem',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem'
            }}>
                <div className="container">
                    <p>&copy; 2026 TechStore Inc. Todos los derechos reservados.</p>
                    <p style={{ marginTop: '0.5rem' }}>
                        <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Política de Privacidad</a> |
                        <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', marginLeft: '0.5rem' }}>Protección de Datos</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};
