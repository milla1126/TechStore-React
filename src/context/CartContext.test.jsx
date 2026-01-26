import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from './CartContext';
import React from 'react';

const TestComponent = () => {
    const { cartItems, addToCart, removeFromCart, getCartTotal, clearCart } = useCart();
    return (
        <div>
            <div data-testid="cart-count">{cartItems.length}</div>
            <div data-testid="total-price">{getCartTotal()}</div>
            <button onClick={() => addToCart({ id: 1, name: 'Product 1', price: 100 })}>Add Item</button>
            <button onClick={() => removeFromCart(1, {}, false)}>Remove Item</button>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
};

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('starts with an empty cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    });

    it('adds an item to the cart', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await act(async () => {
            screen.getByText('Add Item').click();
        });

        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
        expect(screen.getByTestId('total-price')).toHaveTextContent('100');
    });

    it('removes an item from the cart', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await act(async () => {
            screen.getByText('Add Item').click();
        });
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

        await act(async () => {
            screen.getByText('Remove Item').click();
        });
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    });

    it('calculates total price correctly', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await act(async () => {
            screen.getByText('Add Item').click();
            screen.getByText('Add Item').click(); // Adds quantity
        });

        expect(screen.getByTestId('total-price')).toHaveTextContent('200');
    });
});
