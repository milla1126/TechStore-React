import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../features/catalog/data';
import { formatPrice } from '../utils/format';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { AddedToCartModal } from '../features/cart/AddedToCartModal';

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false);
    const product = products.find(p => p.id === parseInt(id));

    // State for selected variants
    const [selections, setSelections] = useState(() => {
        if (!product) return {};
        const initial = {};
        product.variants.forEach(v => {
            initial[v.type] = v.options[0];
        });
        return initial;
    });

    if (!product) {
        return <div className="container" style={{ padding: '4rem' }}>Producto no encontrado</div>;
    }

    const handleSelection = (type, value) => {
        setSelections(prev => ({ ...prev, [type]: value }));
    };

    return (
        <div className="container" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}
            >
                ← Volver al catálogo
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {/* Gallery Section */}
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-bg-surface)' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                {/* Info Section */}
                <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{
                            color: 'var(--color-primary-light)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            fontSize: '0.875rem',
                            letterSpacing: '0.05em'
                        }}>
                            {product.category}
                        </span>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1.2, margin: '0.5rem 0' }}>
                            {product.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                                {formatPrice(product.price)}
                                <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>(IVA incluido)</span>
                            </p>
                            {product.originalPrice && (
                                <p style={{ fontSize: '1.125rem', textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                                    {formatPrice(product.originalPrice)}
                                </p>
                            )}
                        </div>
                    </div>

                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                        {product.description}
                    </p>

                    {/* Variants Selector */}
                    <div style={{ marginBottom: '2rem' }}>
                        {product.variants.map(variant => (
                            <div key={variant.type} style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    marginBottom: '0.75rem',
                                    textTransform: 'capitalize',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    {variant.type}
                                </h4>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    {variant.options.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleSelection(variant.type, option)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: 'var(--radius-md)',
                                                border: '1px solid',
                                                borderColor: selections[variant.type] === option ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                                                backgroundColor: selections[variant.type] === option ? 'var(--color-primary)' : 'transparent',
                                                color: selections[variant.type] === option ? 'white' : 'var(--color-text-secondary)',
                                                transition: 'all var(--transition-fast)'
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>


                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        {product.stock > 0 ? (
                            <>
                                <p style={{ color: product.stock < 5 ? 'var(--color-accent)' : 'var(--color-primary)', fontWeight: 'bold' }}>
                                    Disponibles: {product.stock}
                                </p>
                                <Button
                                    size="lg"
                                    style={{ width: '100%' }}
                                    onClick={() => {
                                        addToCart(product, selections, 1, false);
                                        setShowModal(true);
                                    }}
                                >
                                    Agregar al Carrito
                                </Button>
                            </>
                        ) : (
                            <p style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2rem' }}>Agotado</p>
                        )}

                        {(product.stock > 0 && (product.category === 'Servicios' || product.category === 'Wearables')) ? (
                            <Button
                                variant="outline"
                                size="lg"
                                style={{ width: '100%', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                                onClick={() => {
                                    addToCart(product, selections, 1, true);
                                }}
                            >
                                Suscribirse Mensual (Ahorra 10%)
                            </Button>
                        ) : null}
                    </div>

                    {/* Technical Specs */}
                    <div style={{ borderTop: '1px solid var(--color-bg-surface)', paddingTop: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            Especificaciones Técnicas
                        </h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {product.specs.map((spec, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingBottom: '0.5rem',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>{spec.label}</span>
                                    <span style={{ fontWeight: 500 }}>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            {showModal && (
                <AddedToCartModal
                    product={product}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};
