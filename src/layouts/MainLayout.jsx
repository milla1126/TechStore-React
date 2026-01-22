import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartSidebar } from '../features/cart/CartSidebar';
import { useState } from 'react';

export const MainLayout = () => {
    const { setIsCartOpen, getCartCount, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // In a real app, this would filter/search
        navigate(`/products?search=${searchTerm}`);
    };

    return (
        <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CartSidebar />

            <header style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                boxShadow: 'var(--shadow-md)'
            }}>
                {/* Top Bar - Trust & Support */}
                <div style={{ backgroundColor: 'var(--color-primary-dark)', fontSize: '0.75rem', padding: '0.25rem 0' }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem' }}>
                        <span style={{ opacity: 0.9 }}>📞 Venta Telefónica: 600 123 4567</span>
                        <span style={{ opacity: 0.9 }}>🏢 Tiendas</span>
                        <span style={{ opacity: 0.9 }}>Ayuda</span>
                    </div>
                </div>

                {/* Main Header - Brand & Search */}
                <div className="container" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>

                    {/* Brand */}
                    <Link to="/" style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
                        TECH<span style={{ color: 'var(--color-accent)' }}>STORE</span>
                    </Link>

                    {/* Search Bar - Retail Centerpiece */}
                    <div style={{ flex: 1, maxWidth: '600px' }}>
                        <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                            <input
                                type="text"
                                placeholder="¿Qué estás buscando hoy?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button type="submit" style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                padding: '0 1.5rem',
                                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                                fontWeight: 'bold'
                            }}>
                                🔍
                            </button>
                        </form>
                    </div>

                    {/* User Actions - Cart & Account */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: 'auto' }}>
                        <Link to="/profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', cursor: 'pointer', color: 'white', textDecoration: 'none' }}>
                            <span style={{ fontSize: '1.25rem' }}>👤</span>
                            <span>Mi Cuenta</span>
                        </Link>

                        <div
                            onClick={() => navigate('/cart')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                cursor: 'pointer',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        >
                            <div style={{ position: 'relative' }}>
                                <span style={{ fontSize: '1.5rem' }}>🛒</span>
                                <span style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'white',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    fontSize: '0.7rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {getCartCount()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                                <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Mi Carro</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(getCartTotal())}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Nav - Secondary Navigation */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="container">
                        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            <Link to="/products" style={{ padding: '0.75rem 0', borderBottom: '2px solid transparent', transition: 'all 0.2s' }} className="nav-link">
                                Todo
                            </Link>
                            <Link to="/products?category=Computación" style={{ padding: '0.75rem 0' }}>Computación</Link>
                            <Link to="/products?category=Gaming" style={{ padding: '0.75rem 0' }}>Gaming</Link>
                            <Link to="/products?category=Móviles" style={{ padding: '0.75rem 0' }}>Telefonía</Link>
                            <Link to="/products?category=Audio" style={{ padding: '0.75rem 0' }}>Audio</Link>
                            <Link to="/products?filter=offers" style={{ color: 'var(--color-accent)', padding: '0.75rem 0' }}>Ofertas 🔥</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main style={{ flexGrow: 1, backgroundColor: 'var(--color-bg-base)', paddingBottom: '3rem' }}>
                <Outlet />
            </main>

            <footer style={{
                backgroundColor: '#1f2937',
                color: 'white',
                padding: '3rem 0',
                marginTop: 'auto'
            }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-accent)' }}>Servicio al Cliente</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>
                            <li>Centro de Ayuda</li>
                            <li>Seguimiento de Orden</li>
                            <li>Cambios y Devoluciones</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-accent)' }}>Acerca de Nosotros</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>
                            <li>Nuestra Historia</li>
                            <li>Tiendas</li>
                            <li>Trabaja con Nosotros</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-accent)' }}>Suscríbete</h4>
                        <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1rem' }}>Recibe las mejores ofertas antes que nadie.</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="email" placeholder="Email" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #374151', backgroundColor: '#374151', color: 'white', width: '100%' }} />
                            <button style={{ backgroundColor: 'var(--color-accent)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold' }}>→</button>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid #374151', textAlign: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
                    &copy; 2026 TechStore Inc. Inspirado en la experiencia retail.
                </div>
            </footer>
        </div>
    );
};
