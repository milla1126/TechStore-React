import React, { useState } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { formatPrice } from '../utils/format';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';

export const AdminProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');

    if (!user || (user.role !== ROLES.ADMIN && user.role !== ROLES.VENDOR)) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
            <h2>Acceso Denegado</h2>
            <p>Se requieren permisos administrativos.</p>
            <Button onClick={() => navigate('/')}>Volver al Inicio</Button>
        </div>;
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', minHeight: '80vh' }}>
            {/* Sidebar Navigation */}
            <aside style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--color-bg-surface)', height: 'fit-content' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                        {user.name[0].toUpperCase()}
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{user.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Administrador</p>
                </div>

                <nav style={{ display: 'grid', gap: '0.5rem' }}>
                    <button
                        onClick={() => setActiveSection('overview')}
                        style={{ textAlign: 'left', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: activeSection === 'overview' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: activeSection === 'overview' ? 'var(--color-primary)' : 'inherit', fontWeight: activeSection === 'overview' ? 'bold' : 'normal' }}
                    >
                        📊 Vista General
                    </button>
                    <button
                        onClick={() => setActiveSection('products')}
                        style={{ textAlign: 'left', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: activeSection === 'products' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: activeSection === 'products' ? 'var(--color-primary)' : 'inherit', fontWeight: activeSection === 'products' ? 'bold' : 'normal' }}
                    >
                        📦 Gestionar Productos
                    </button>
                    <button
                        onClick={() => setActiveSection('orders')}
                        style={{ textAlign: 'left', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: activeSection === 'orders' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: activeSection === 'orders' ? 'var(--color-primary)' : 'inherit', fontWeight: activeSection === 'orders' ? 'bold' : 'normal' }}
                    >
                        📜 Todos los Pedidos
                    </button>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-bg-surface)', margin: '1rem 0' }} />
                    <button
                        onClick={logout}
                        style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--color-error)' }}
                    >
                        🚪 Cerrar Sesión
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--color-bg-surface)' }}>
                {activeSection === 'overview' && <AdminOverview user={user} />}
                {activeSection === 'products' && <InventoryView />}
                {activeSection === 'orders' && <SalesView />}
            </main>
        </div>
    );
};

// Reusable Views from AdminDashboard but integrated into Profile
const AdminOverview = ({ user }) => {
    const { orders } = useOrders();
    const { products } = useProducts();
    const totalSales = orders.reduce((acc, curr) => acc + curr.total, 0);

    return (
        <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Panel de Control Profesional</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary)' }}>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Ingresos Totales</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{formatPrice(totalSales)}</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-accent)' }}>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Pedidos Clientes</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{orders.length}</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid #888' }}>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Productos Activos</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{products.length}</p>
                </div>
            </div>

            <h3>Acciones Rápidas</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Usa el menú lateral para gestionar la tienda.</p>
        </div>
    );
};

// We will keep InventoryView and SalesView as components that can be used here too
import { InventoryView, SalesView } from './AdminDashboard';
