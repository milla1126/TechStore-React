import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';

import { formatPrice } from '../../utils/format';

export const ProductCard = ({ product }) => {
    return (
        <div className="product-card" style={{
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--color-bg-surface)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
            position: 'relative'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <Link to={`/product/${product.id}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />

            {product.isNew && (
                <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    zIndex: 2
                }}>
                    NUEVO
                </span>
            )}

            <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>

            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {product.category}
                </p>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                    {product.name}
                </h3>
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary-light)' }}>
                        {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                        <p style={{ fontSize: '0.875rem', textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                            {formatPrice(product.originalPrice)}
                        </p>
                    )}
                </div>

                <div style={{ marginTop: 'auto', zIndex: 2, position: 'relative' }}>
                    <Link to={`/product/${product.id}`}>
                        <Button style={{ width: '100%' }}>
                            Ver Detalles
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
