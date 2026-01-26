import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartSidebar } from './CartSidebar';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock useCart for specific UI tests
import { useCart } from '../../context/CartContext';
vi.mock('../../context/CartContext', async () => {
    const actual = await vi.importActual('../../context/CartContext');
    return {
        ...actual,
        useCart: vi.fn(),
    };
});

describe('CartSidebar Component', () => {
    it('does not render when isCartOpen is false', () => {
        useCart.mockReturnValue({ isCartOpen: false });
        const { container } = render(
            <BrowserRouter>
                <CartSidebar />
            </BrowserRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders empty message when open and empty', () => {
        useCart.mockReturnValue({
            cartItems: [],
            isCartOpen: true,
            setIsCartOpen: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            getCartTotal: () => 0
        });

        render(
            <BrowserRouter>
                <CartSidebar />
            </BrowserRouter>
        );

        expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
        expect(screen.getByText('Tu Carrito')).toBeInTheDocument();
    });

    it('renders items and total when open and not empty', () => {
        useCart.mockReturnValue({
            cartItems: [{ id: 1, name: 'Item 1', price: 10, quantity: 2, selectedVariants: {}, image: '' }],
            isCartOpen: true,
            setIsCartOpen: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            getCartTotal: () => 20
        });

        render(
            <BrowserRouter>
                <CartSidebar />
            </BrowserRouter>
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('$20.00')).toBeInTheDocument();
        expect(screen.getByText('Tu Carrito')).toBeInTheDocument();
    });
});
