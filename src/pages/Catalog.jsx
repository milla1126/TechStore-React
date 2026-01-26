import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../features/catalog/ProductCard';

export const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { products } = useProducts();
    const [activeCategory, setActiveCategory] = useState('Todos');

    useEffect(() => {
        const filterParam = searchParams.get('filter');
        if (filterParam === 'offers') setActiveCategory('Ofertas');
        else if (filterParam === 'combos') setActiveCategory('Paquetes');
        else setActiveCategory('Todos');
    }, [searchParams]);

    const categories = ['Todos', 'Ofertas', 'Paquetes', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(p => {
        if (activeCategory === 'Todos') return true;
        if (activeCategory === 'Ofertas') return p.isOffer === true;
        if (activeCategory === 'Paquetes') return p.type === 'combo';
        return p.category === activeCategory;
    });

    const handleFilterClick = (cat) => {
        setActiveCategory(cat);
        if (cat === 'Ofertas') setSearchParams({ filter: 'offers' });
        else if (cat === 'Paquetes') setSearchParams({ filter: 'combos' });
        else setSearchParams({});
    };

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
                    Catálogo de Productos
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Explora nuestra selección de dispositivos de última generación.
                </p>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '3rem',
                flexWrap: 'wrap'
            }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleFilterClick(cat)}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                            color: activeCategory === cat ? 'white' : 'var(--color-text-secondary)',
                            border: '1px solid',
                            borderColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                            transition: 'all var(--transition-fast)'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '3rem' }}>
                    No se encontraron productos en esta categoría.
                </p>
            )}
        </div>
    );
};
