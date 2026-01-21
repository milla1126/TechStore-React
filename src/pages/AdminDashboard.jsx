import React, { useState } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';
import { products } from '../features/catalog/data';

export const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('inventory');

    if (!user || (user.role !== ROLES.ADMIN && user.role !== ROLES.VENDOR)) {
        return <div className="container" style={{ padding: '2rem' }}>Acceso Denegado. Se requieren permisos de Administrador o Vendedor.</div>;
    }

    const tabs = [
        { id: 'inventory', label: 'Inventario' },
        { id: 'sales', label: 'Registro de Ventas' },
        { id: 'profits', label: 'Ganancias Diarias' },
        { id: 'vendors', label: 'Vendedores' },
    ];

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Panel Administrativo</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-bg-surface)' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '1rem',
                            borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : 'none',
                            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                {activeTab === 'inventory' && <InventoryView />}
                {activeTab === 'sales' && <SalesView />}
                {activeTab === 'profits' && <ProfitsView />}
                {activeTab === 'vendors' && <VendorsView />}
            </div>
        </div>
    );
};

const InventoryView = () => (
    <div>
        <h3>Control de Inventario</h3>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-bg-surface)' }}>
                    <th style={{ padding: '1rem' }}>Producto</th>
                    <th style={{ padding: '1rem' }}>Stock</th>
                    <th style={{ padding: '1rem' }}>Estado</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--color-bg-surface)' }}>
                        <td style={{ padding: '1rem' }}>{p.name}</td>
                        <td style={{ padding: '1rem' }}>{p.stock}</td>
                        <td style={{ padding: '1rem', color: p.stock < 5 ? 'var(--color-accent)' : 'green' }}>
                            {p.stock === 0 ? 'Agotado' : p.stock < 5 ? 'Bajo Stock' : 'OK'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SalesView = () => (
    <div>
        <h3>Registro de Ventas Recientes</h3>
        <p>Mostrando últimas ventas...</p>
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
            <p><strong>Orden #10234</strong> - Cliente: Juan Perez - Total: $299.99 - Fecha: 20/01/2026</p>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
            <p><strong>Orden #10235</strong> - Cliente: Ana Garcia - Total: $1299.99 - Fecha: 19/01/2026</p>
        </div>
    </div>
);

const ProfitsView = () => (
    <div>
        <h3>Ganancias Diarias</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
                <h4>Hoy</h4>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$1,599.98</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)' }}>
                <h4>Esta Semana</h4>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$8,450.00</p>
            </div>
        </div>
    </div>
);

const VendorsView = () => (
    <div>
        <h3>Registro de Vendedores</h3>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-bg-surface)' }}>
                    <th style={{ padding: '1rem' }}>Vendedor</th>
                    <th style={{ padding: '1rem' }}>Ventas Mes</th>
                    <th style={{ padding: '1rem' }}>Productividad</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-bg-surface)' }}>
                    <td style={{ padding: '1rem' }}>Carlos Vendedor</td>
                    <td style={{ padding: '1rem' }}>$4,500</td>
                    <td style={{ padding: '1rem' }}>Alta</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-bg-surface)' }}>
                    <td style={{ padding: '1rem' }}>Maria Ventas</td>
                    <td style={{ padding: '1rem' }}>$3,200</td>
                    <td style={{ padding: '1rem' }}>Media</td>
                </tr>
            </tbody>
        </table>
    </div>
);
