import { describe, it, expect } from 'vitest';
import { products } from './data';

describe('Products Data Integrity', () => {
    it('is an array of products', () => {
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
    });

    it('each product has the required properties', () => {
        products.forEach(product => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('category');
            expect(product).toHaveProperty('image');
        });
    });

    it('prices are all positive numbers', () => {
        products.forEach(product => {
            expect(typeof product.price).toBe('number');
            expect(product.price).toBeGreaterThan(0);
        });
    });

    it('IDs are unique', () => {
        const ids = products.map(p => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
});
