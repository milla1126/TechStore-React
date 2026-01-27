import { describe, it, expect } from 'vitest';

describe('Cart Logic', () => {
    const addItem = (cart, product, qty) => {
        const existing = cart.find(i => i.id === product.id);
        if (existing) {
            return cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
        }
        return [...cart, { ...product, quantity: qty }];
    };

    it('5. adds a new item to the cart', () => {
        let cart = [];
        const product = { id: 101, name: 'Mouse', price: 10000 };
        cart = addItem(cart, product, 1);
        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toBe(1);
    });

    it('6. updates quantity if item exists', () => {
        let cart = [{ id: 101, name: 'Mouse', price: 10000, quantity: 1 }];
        const product = { id: 101, name: 'Mouse', price: 10000 };
        cart = addItem(cart, product, 2);
        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toBe(3);
    });

    it('7. calculates total correctly', () => {
        const cart = [
            { price: 1000, quantity: 2 },
            { price: 5000, quantity: 1 }
        ];
        const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        expect(total).toBe(7000);
    });
});
