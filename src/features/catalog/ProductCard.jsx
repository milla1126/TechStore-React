
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../context/CartContext';
import { AddedToCartModal } from '../cart/AddedToCartModal';

export const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, {}, 1, false, false); // Pass false to prevent sidebar opening
        setShowModal(true);
    };

    return (
        <>
            <div className="product-card" style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'box-shadow var(--transition-normal), transform var(--transition-fast)',
                position: 'relative',
                overflow: 'hidden'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.zIndex = 2; // Popping effect
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.zIndex = 0;
                }}
            >
                <Link to={`/product/${product.id}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />

                {/* Labels */}
                <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {product.isNew && (
                        <span style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '2px',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}>
                            Nuevo
                        </span>
                    )}
                    {product.originalPrice && (
                        <span style={{
                            backgroundColor: 'var(--color-error)',
                            color: 'white',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '2px',
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                        }}>
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                    )}
                </div>

                {/* ID/SKU Placeholder - Retail Feel */}
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '0.65rem', color: 'var(--color-text-muted)', zIndex: 2 }}>
                    ID: {10000 + product.id}
                </div>

                {/* Image */}
                <div style={{ position: 'relative', paddingTop: '100%', borderBottom: '1px solid var(--color-bg-surface)' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            position: 'absolute',
                            top: '10%',
                            left: '10%',
                            width: '80%',
                            height: '80%',
                            objectFit: 'contain', // Changed to contain for retail product look
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                </div>

                {/* Content */}
                <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                    }}>
                        {product.category}
                    </p>

                    <h3 style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--color-primary-dark)',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '2.5rem' // Fixed height for alignment
                    }}>
                        {product.name}
                    </h3>

                    {/* Specs Preview - PC Factory Style (Often show key spec) */}
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                        {product.specs && product.specs[0] ? `${product.specs[0].label}: ${product.specs[0].value}` : ''}
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            {product.originalPrice && (
                                <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                                {formatPrice(product.price)}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 500 }}>
                                Pagando con Transferencia
                            </span>
                        </div>

                        <div style={{ marginTop: '1rem', position: 'relative', zIndex: 2 }}>
                            <Button
                                style={{ width: '100%', fontSize: '0.9rem', padding: '0.5rem' }}
                                onClick={handleAddToCart}
                            >
                                Agregar al Carro
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <AddedToCartModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                product={product}
            />
        </>
    );
};
