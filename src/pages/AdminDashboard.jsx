import React, { useState } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { formatPrice } from '../utils/format';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('inventory');

    if (!user || (user.role !== ROLES.ADMIN && user.role !== ROLES.VENDOR)) {
        return <div className="container" style={{ padding: '2rem' }}>Acceso Denegado. Se requieren permisos de Administrador o Vendedor.</div>;
    }

    const tabs = [
        { id: 'inventory', label: 'Inventario / Productos' },
        { id: 'sales', label: 'Pedidos de Clientes' },
        { id: 'profits', label: 'Dashboard de Ventas' },
    ];

    return (
        <div className="container" style={{ padding: '2rem 2rem 5rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>Panel Administrativo</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                Bienvenido, {user.name}. Gestiona tu tienda y revisa los pedidos aquí.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-bg-surface)' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '1rem 0.5rem',
                            borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: activeTab === tab.id ? '600' : '500',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-bg-surface)' }}>
                {activeTab === 'inventory' && <InventoryView />}
                {activeTab === 'sales' && <SalesView />}
                {activeTab === 'profits' && <ProfitsView />}
            </div>
        </div>
    );
};

export const InventoryView = () => {
    const { products, updateProduct, addProduct, deleteProduct } = useProducts();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isAdding, setIsAdding] = useState(false);

    const handleEdit = (product) => {
        setEditingId(product.id);
        setEditForm({ name: product.name, price: product.price, stock: product.stock, category: product.category });
    };

    const handleSave = () => {
        updateProduct(editingId, editForm);
        setEditingId(null);
    };

    const handleAddNew = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newProduct = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            category: formData.get('category'),
            description: 'Nuevo producto agregado desde el panel.'
        };
        addProduct(newProduct);
        setIsAdding(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Gestión de Productos</h3>
                <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancelar' : '+ Agregar Producto'}
                </Button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddNew} style={{
                    padding: '1.5rem',
                    border: '1px solid var(--color-primary)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    <Input name="name" label="Nombre" required />
                    <Input name="price" label="Precio" type="number" required />
                    <Input name="stock" label="Stock" type="number" required />
                    <Input name="category" label="Categoría" required />
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Button type="submit" style={{ width: '100%' }}>Guardar Producto</Button>
                    </div>
                </form>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-bg-surface)' }}>
                            <th style={{ padding: '1rem' }}>ID</th>
                            <th style={{ padding: '1rem' }}>Producto</th>
                            <th style={{ padding: '1rem' }}>Categoría</th>
                            <th style={{ padding: '1rem' }}>Precio</th>
                            <th style={{ padding: '1rem' }}>Stock</th>
                            <th style={{ padding: '1rem' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--color-bg-surface)' }}>
                                <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{p.id}</td>
                                <td style={{ padding: '1rem' }}>
                                    {editingId === p.id ? (
                                        <input
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            style={{ backgroundColor: 'var(--color-bg-surface)', color: 'white', border: '1px solid #444', padding: '0.25rem', borderRadius: '4px', width: '100%' }}
                                        />
                                    ) : p.name}
                                </td>
                                <td style={{ padding: '1rem' }}>{p.category}</td>
                                <td style={{ padding: '1rem' }}>
                                    {editingId === p.id ? (
                                        <input
                                            type="number"
                                            value={editForm.price}
                                            onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                                            style={{ backgroundColor: 'var(--color-bg-surface)', color: 'white', border: '1px solid #444', padding: '0.25rem', borderRadius: '4px', width: '80px' }}
                                        />
                                    ) : formatPrice(p.price)}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {editingId === p.id ? (
                                        <input
                                            type="number"
                                            value={editForm.stock}
                                            onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) })}
                                            style={{ backgroundColor: 'var(--color-bg-surface)', color: 'white', border: '1px solid #444', padding: '0.25rem', borderRadius: '4px', width: '60px' }}
                                        />
                                    ) : (
                                        <span style={{ color: p.stock < 5 ? 'var(--color-accent)' : 'inherit' }}>{p.stock}</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {editingId === p.id ? (
                                            <Button size="sm" onClick={handleSave}>OK</Button>
                                        ) : (
                                            <Button size="sm" variant="outline" onClick={() => handleEdit(p)}>Editar</Button>
                                        )}
                                        <Button size="sm" variant="outline" style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }} onClick={() => deleteProduct(p.id)}>X</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const SalesView = () => {
    const { orders, updateOrderStatus, ORDER_STATUS } = useOrders();

    return (
        <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Pedidos de Clientes</h3>
            {orders.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>No hay pedidos registrados.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-bg-surface)' }}>
                                <th style={{ padding: '1rem' }}>Orden ID</th>
                                <th style={{ padding: '1rem' }}>Cliente</th>
                                <th style={{ padding: '1rem' }}>Fecha</th>
                                <th style={{ padding: '1rem' }}>Total</th>
                                <th style={{ padding: '1rem' }}>Estado</th>
                                <th style={{ padding: '1rem' }}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--color-bg-surface)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>#{order.id}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <p style={{ marginBottom: '0.25rem' }}>{order.userEmail}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.shippingAddress}</p>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{new Date(order.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{formatPrice(order.total)}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem',
                                            backgroundColor: 'rgba(255,255,255,0.05)',
                                            border: '1px solid var(--color-bg-surface)'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <select
                                            defaultValue=""
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            style={{ backgroundColor: 'var(--color-bg-surface)', color: 'white', border: '1px solid var(--color-bg-surface)', padding: '0.4rem', borderRadius: '4px', fontSize: '0.875rem' }}
                                        >
                                            <option value="" disabled>Actualizar...</option>
                                            {Object.values(ORDER_STATUS).map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const ProfitsView = () => {
    const { orders } = useOrders();
    const totalSales = orders.reduce((acc, curr) => acc + curr.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'Pendiente').length;

    return (
        <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Dashboard de Ventas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary)' }}>
                    <h4 style={{ color: 'var(--color-primary-light)', marginBottom: '0.5rem' }}>Ventas Totales</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{formatPrice(totalSales)}</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-accent)' }}>
                    <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Pedidos Realizados</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{orders.length}</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid #888' }}>
                    <h4 style={{ color: '#ccc', marginBottom: '0.5rem' }}>Pendientes de Envío</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{pendingOrders}</p>
                </div>
            </div>
        </div>
    );
};
