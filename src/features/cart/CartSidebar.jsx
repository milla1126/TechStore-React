import React from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/format';

export const CartSidebar = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(2px)',
                    zIndex: 40
                }}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar Panel */}
            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'var(--color-bg-base)',
                borderLeft: '1px solid var(--color-bg-surface)',
                boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform var(--transition-normal)'
            }}>

                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Tu Carrito</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', padding: '0.25rem' }}
                    >
                        ×
                    </button>
                </div>

                {/* Items List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
                            <p>Tu carrito está vacío.</p>
                            <Button
                                variant="outline"
                                style={{ marginTop: '1rem' }}
                                onClick={() => setIsCartOpen(false)}
                            >
                                Seguir comprando
                            </Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.selectedVariants, item.isSubscription)}
                                                style={{ color: 'var(--color-error)', fontSize: '0.75rem' }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>

                                        {/* Variants & Type info */}
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                                            {Object.entries(item.selectedVariants).map(([key, val]) => (
                                                <span key={key} style={{ display: 'block' }}>{key}: {val}</span>
                                            ))}
                                            {item.isSubscription && (
                                                <span style={{ color: 'var(--color-accent)', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>
                                                    🔄 Suscripción Mensual
                                                </span>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-bg-surface)', padding: '0.125rem', borderRadius: 'var(--radius-sm)' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.selectedVariants, item.isSubscription, -1)}
                                                    style={{ padding: '0 0.5rem', color: 'var(--color-text-primary)' }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ fontSize: '0.875rem' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.selectedVariants, item.isSubscription, 1)}
                                                    style={{ padding: '0 0.5rem', color: 'var(--color-text-primary)' }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span style={{ fontWeight: 'bold' }}>{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-bg-surface)', backgroundColor: 'var(--color-bg-card)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>{formatPrice(getCartTotal())}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
                            IVA incluido. Envío calculado en el checkout.
                        </p>
                        <Button
                            style={{ width: '100%' }}
                            onClick={() => {
                                setIsCartOpen(false);
                                navigate('/checkout');
                            }}
                        >
                            Finalizar Compra
                        </Button>
                    </div>
                )}
            </div >
        </>
    );
};
