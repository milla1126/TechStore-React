import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { formatPrice } from '../utils/format';

const SHIPPING_RATES = {
    'stgo-centro': { label: 'Santiago Centro', price: 3000 },
    'las-condes': { label: 'Las Condes', price: 4500 },
    'providencia': { label: 'Providencia', price: 4000 },
    'maipu': { label: 'Maipú', price: 3500 },
    'florida': { label: 'La Florida', price: 3500 },
    'nunoa': { label: 'Ñuñoa', price: 3800 },
};

export const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [shippingSector, setShippingSector] = useState('');
    const [paymentStep, setPaymentStep] = useState(false); // false = info, true = payment

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            // In a real app we would pass the return URL
            navigate('/login');
        }
        if (cartItems.length === 0) {
            navigate('/products');
        }
    }, [user, cartItems, navigate]);

    if (!user) return null; // Avoid flicker

    const shippingCost = shippingSector ? SHIPPING_RATES[shippingSector].price : 0;
    const total = getCartTotal() + shippingCost;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            clearCart();
            navigate('/success');
        }, 1500);
    };

    return (
        <div className="container" style={{ padding: '2rem 0 4rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Finalizar Compra</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem' }}>
                {/* Left Column: Forms */}
                <div>
                    {!paymentStep ? (
                        <div className="fade-in">
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Información de Envío</h2>
                            <form id="shipping-form" style={{ display: 'grid', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); setPaymentStep(true); }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <Input label="Nombre" defaultValue={user.name.split(' ')[0]} required />
                                    <Input label="Apellido" defaultValue={user.name.split(' ')[1] || ''} required />
                                </div>
                                <Input label="Dirección" placeholder="Av. Providencia 1234, Depto 501" required />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Comuna de Despacho</label>
                                    <select
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            backgroundColor: 'var(--color-bg-surface)',
                                            color: 'white',
                                            border: '1px solid var(--color-bg-surface)'
                                        }}
                                        value={shippingSector}
                                        onChange={(e) => setShippingSector(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona tu sector...</option>
                                        {Object.entries(SHIPPING_RATES).map(([key, rate]) => (
                                            <option key={key} value={key}>{rate.label} - {formatPrice(rate.price)}</option>
                                        ))}
                                    </select>
                                </div>

                                <Input label="Teléfono" placeholder="+56 9 1234 5678" required />

                                <Button type="submit" size="lg" disabled={!shippingSector}>
                                    Continuar al Pago
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="fade-in">
                            <button
                                onClick={() => setPaymentStep(false)}
                                style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                ← Volver a información
                            </button>

                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Pago Seguro</h2>

                            <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gap: '1.5rem' }}>
                                <div style={{ padding: '1.5rem', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                                    <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Tarjeta de Crédito / Débito</h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <Input label="Número de Tarjeta" placeholder="0000 0000 0000 0000" maxLength="16" required />
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <Input label="Vencimiento (MM/AA)" placeholder="12/28" maxLength="5" required />
                                            <Input label="CVV" placeholder="123" maxLength="3" type="password" required />
                                        </div>
                                        <Input label="Nombre en la Tarjeta" placeholder="COMO APARECE EN LA TARJETA" required />
                                    </div>
                                </div>

                                <Button type="submit" size="lg" style={{ width: '100%' }}>
                                    Pagar {formatPrice(total)}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Right Column: Summary */}
                <div style={{
                    backgroundColor: 'var(--color-bg-card)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '6rem'
                }}>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-bg-surface)' }}>
                        Resumen del Pedido
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                        {cartItems.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.quantity}x {item.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-bg-surface)', paddingTop: '1rem', display: 'grid', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                            <span>{formatPrice(getCartTotal())}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Envío</span>
                            <span>{shippingSector ? formatPrice(shippingCost) : 'Calculando...'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-bg-surface)' }}>
                            <span style={{ color: 'var(--color-text-primary)' }}>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
