import React from 'react';
import { Button } from '../../components/Button';
import { formatPrice } from '../../utils/format';
import { useNavigate } from 'react-router-dom';

export const AddedToCartModal = ({ isOpen, onClose, product }) => {
    const navigate = useNavigate();

    if (!isOpen || !product) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(2px)'
        }}
            onClick={onClose}
        >
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '650px',
                padding: '0',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                position: 'relative',
                margin: '1rem',
                overflow: 'hidden'
            }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '2px solid var(--color-success)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-success)',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>✓</div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
                            Producto agregado al carro de compras
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            color: '#999',
                            cursor: 'pointer'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    {/* Product Image */}
                    <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '0.5rem'
                        }}>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                    {product.name}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                    ID {10000 + product.id}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                                    {formatPrice(product.price)}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>Transferencia</div>
                            </div>
                        </div>

                        <div style={{
                            fontSize: '0.85rem',
                            color: '#666',
                            marginBottom: '1rem',
                            display: 'block',
                            width: '100%',
                            textAlign: 'right'
                        }}>
                            {formatPrice(Math.round(product.price * 1.03))} Otros medios de pago
                        </div>

                        {/* Description/Specs snippet could go here if available */}
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{
                    padding: '1.5rem 2rem',
                    backgroundColor: '#f9fafb',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem'
                }}>
                    <Button
                        variant="outline"
                        style={{
                            backgroundColor: '#d1fae5',
                            borderColor: '#d1fae5',
                            color: '#065f46',
                            fontWeight: 'bold',
                            padding: '0.75rem 2rem',
                            width: '200px'
                        }}
                        onClick={onClose}
                    >
                        Seguir comprando
                    </Button>
                    <Button
                        style={{
                            backgroundColor: '#1f2937',
                            color: 'white',
                            borderColor: '#1f2937',
                            fontWeight: 'bold',
                            padding: '0.75rem 2rem',
                            width: '200px'
                        }}
                        onClick={() => {
                            onClose();
                            navigate('/cart');
                        }}
                    >
                        Ir al carro
                    </Button>
                </div>
            </div>
        </div>
    );
};
