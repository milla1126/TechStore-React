import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';

export const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const { getOrdersByUser } = useOrders();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: user?.name || '', address: user?.address || '' });

    if (!user) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2 style={{ marginBottom: '1rem' }}>No has iniciado sesión</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Accede a tu perfil para ver tus pedidos y configuraciones.
                </p>
                <Link to="/login">
                    <Button>Iniciar Sesión</Button>
                </Link>
            </div>
        );
    }

    const orders = getOrdersByUser(user.email);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser(formData);
        setIsEditing(false);
    };

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                {/* User Info Card */}
                <div style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    border: '1px solid var(--color-bg-surface)',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '6rem'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: 'white',
                            margin: '0 auto 1.5rem',
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                        }}>
                            {user.name[0].toUpperCase()}
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.name}</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{user.email}</p>
                    </div>

                    {!isEditing ? (
                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                                <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Membresía</p>
                                <p style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>Plan {user.plan}</p>
                            </div>
                            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                                <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Dirección de Envío</p>
                                <p style={{ fontWeight: '500' }}>{user.address || 'No registrada'}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Editar Perfil</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                            <Input label="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            <Input label="Dirección Predeterminada" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                <Button type="submit" size="sm">Guardar</Button>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancelar</Button>
                            </div>
                        </form>
                    )}

                    <Button variant="outline" onClick={logout} style={{ width: '100%', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
                        Cerrar Sesión
                    </Button>
                </div>

                {/* Orders Content */}
                <div style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    border: '1px solid var(--color-bg-surface)'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        📦 Mis Pedidos
                        <span style={{ fontSize: '0.875rem', fontWeight: 'normal', backgroundColor: 'var(--color-bg-surface)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                            {orders.length}
                        </span>
                    </h3>

                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Aún no has realizado ninguna compra.</p>
                            <Link to="/products">
                                <Button>Comenzar a Comprar</Button>
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {orders.map(order => (
                                <div key={order.id} style={{
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-bg-surface)',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    transition: 'transform 0.2s',
                                    cursor: 'default'
                                }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <div>
                                            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Orden #{order.id}</p>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                                Realizada el {new Date(order.date).toLocaleDateString('es-CL')}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{
                                                padding: '0.4rem 1rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.75rem',
                                                backgroundColor: order.status === 'Entregado' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                                                color: order.status === 'Entregado' ? 'var(--color-success)' : 'inherit',
                                                fontWeight: 600,
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                textTransform: 'uppercase'
                                            }}>
                                                {order.status}
                                            </div>
                                            <p style={{ marginTop: '0.75rem', fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.25rem' }}>
                                                {formatPrice(order.total)}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-sm)' }}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} style={{ position: 'relative' }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    title={item.name}
                                                    style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
                                                />
                                                {item.quantity > 1 && (
                                                    <span style={{ position: 'absolute', bottom: '-5px', right: '-5px', backgroundColor: 'var(--color-accent)', color: 'white', padding: '0 4px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>
                                                        x{item.quantity}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                                        📍 Enviado a: {order.shippingAddress}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
