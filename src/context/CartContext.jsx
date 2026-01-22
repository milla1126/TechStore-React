import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('techstore_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('techstore_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, variants = {}, quantity = 1, isSubscription = false, openSidebar = true) => {
        setCartItems(prev => {
            // Check if adding exceeds stock
            const variantKey = JSON.stringify(variants);
            const existingItem = prev.find(
                item => item.id === product.id &&
                    JSON.stringify(item.selectedVariants) === variantKey &&
                    item.isSubscription === isSubscription
            );

            const currentQty = existingItem ? existingItem.quantity : 0;
            if (currentQty + quantity > product.stock) {
                alert(`Solo hay ${product.stock} unidades disponibles.`);
                return prev;
            }

            const existingItemIndex = prev.findIndex(
                item => item.id === product.id &&
                    JSON.stringify(item.selectedVariants) === variantKey &&
                    item.isSubscription === isSubscription
            );

            if (existingItemIndex >= 0) {
                // Item exists, just update quantity
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                // New item
                return [...prev, {
                    ...product,
                    selectedVariants: variants,
                    quantity,
                    isSubscription,
                    addedAt: new Date().toISOString()
                }];
            }
        });
        if (openSidebar) {
            setIsCartOpen(true);
        }
    };

    const removeFromCart = (itemId, variants, isSubscription) => {
        const variantKey = JSON.stringify(variants);
        setCartItems(prev => prev.filter(item =>
            !(item.id === itemId &&
                JSON.stringify(item.selectedVariants) === variantKey &&
                item.isSubscription === isSubscription)
        ));
    };

    const updateQuantity = (itemId, variants, isSubscription, delta) => {
        const variantKey = JSON.stringify(variants);
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId &&
                JSON.stringify(item.selectedVariants) === variantKey &&
                item.isSubscription === isSubscription) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            setIsCartOpen,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
