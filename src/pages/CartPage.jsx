import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/format';

export const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const total = getCartTotal();

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Tu carro está vacío</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Agrega productos para verlos aquí.
                </p>
                <Link to="/products">
                    <Button>Ir al Catálogo</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            {/* Breadcrumb / Title */}
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                <span>&gt;</span>
                <span style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Carro</span>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                Tu carro ({cartItems.length} producto{cartItems.length !== 1 ? 's' : ''})
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

                {/* Product List - Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} style={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            display: 'flex',
                            gap: '1.5rem',
                            position: 'relative'
                        }}>
                            {/* Image */}
                            <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                {item.isSubscription && (
                                    <div style={{
                                        position: 'absolute', top: '10px', left: '10px',
                                        backgroundColor: '#eff6ff', color: '#2563eb',
                                        fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold'
                                    }}>
                                        Suscripción
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>
                                            {item.category} | ID {55000 + item.id}
                                        </div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginTop: '0.25rem' }}>
                                            {item.name}
                                        </h3>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                            {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')}
                                        </div>
                                    </div>

                                    {/* Prices */}
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                                            {formatPrice(item.price)}
                                        </div>
                                        {item.price * 1.03 > item.price && (
                                            <>
                                                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Transferencia / Débito</div>
                                                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                                    {formatPrice(Math.round(item.price * 1.03))}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Otros medios de pago</div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Controls */}
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                                    <button
                                        onClick={() => removeFromCart(item.id, item.selectedVariants, item.isSubscription)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.25rem',
                                            color: '#6b7280', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        🗑 Eliminar
                                    </button>

                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedVariants, item.isSubscription, -1)}
                                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#6b7280' }}
                                        >
                                            -
                                        </button>
                                        <span style={{ width: '40px', textAlign: 'center', fontWeight: 600 }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedVariants, item.isSubscription, 1)}
                                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#6b7280' }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Card - Right Column */}
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    position: 'sticky',
                    top: '100px'
                }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', pb: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                        Resumen de tu compra
                    </h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: 600, color: '#374151' }}>Producto ({cartItems.length})</span>
                    </div>

                    <div style={{ margin: '1.5rem 0', pt: '1.5rem', borderTop: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 'bold', color: '#111827' }}>Total Transferencia / Débito</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatPrice(total)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                            <span>Total otros medios de pago</span>
                            <span>{formatPrice(Math.round(total * 1.03))}</span>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#f9fafb',
                        borderRadius: '6px', fontSize: '0.85rem', color: '#4b5563', marginBottom: '1.5rem'
                    }}>
                        <span>🚚</span>
                        <span>El valor del despacho se calculará cuando se seleccione el tipo de entrega.</span>
                    </div>

                    <Button
                        style={{ width: '100%', backgroundColor: '#1f2937', color: 'white', padding: '1rem' }}
                        onClick={() => navigate('/checkout')}
                    >
                        Continuar
                    </Button>

                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', color: '#9ca3af', fontSize: '0.8rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>🔒 Pago 100% seguro</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>🛡 Garantía en tus productos</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
