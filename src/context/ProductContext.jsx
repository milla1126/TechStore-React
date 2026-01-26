import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../features/catalog/data';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProducts must be used within a ProductProvider');
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedProducts = localStorage.getItem('techstore_products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            // First run: load from data.js
            setProducts(initialProducts);
            localStorage.setItem('techstore_products', JSON.stringify(initialProducts));
        }
        setLoading(false);
    }, []);

    const saveProducts = (newProducts) => {
        setProducts(newProducts);
        localStorage.setItem('techstore_products', JSON.stringify(newProducts));
    };

    const addProduct = (productData) => {
        const newProduct = {
            id: Date.now(), // Simple ID generation
            isNew: true,
            specs: [],
            variants: [],
            stock: 0,
            image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&q=80', // Placeholder
            ...productData
        };
        const updatedList = [...products, newProduct];
        saveProducts(updatedList);
        return newProduct;
    };

    const updateProduct = (id, updates) => {
        const updatedList = products.map(p =>
            p.id === id ? { ...p, ...updates } : p
        );
        saveProducts(updatedList);
    };

    const deleteProduct = (id) => {
        const updatedList = products.filter(p => p.id !== id);
        saveProducts(updatedList);
    };

    const getProductById = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            getProductById,
            loading
        }}>
            {!loading && children}
        </ProductContext.Provider>
    );
};
