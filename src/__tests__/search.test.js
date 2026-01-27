import { describe, it, expect } from 'vitest';

const mockProducts = [
    { id: 1, name: 'iPhone 15', category: 'Móviles' },
    { id: 2, name: 'MacBook Pro', category: 'Computación' },
    { id: 3, name: 'AirPods', category: 'Audio' }
];

describe('Search and Filter Logic', () => {
    it('3. filters products by category', () => {
        const category = 'Audio';
        const filtered = mockProducts.filter(p => p.category === category);
        expect(filtered).toHaveLength(1);
        expect(filtered[0].name).toBe('AirPods');
    });

    it('4. filters products by search term (autocomplete)', () => {
        const term = 'mac';
        const searchResults = mockProducts.filter(p =>
            p.name.toLowerCase().includes(term.toLowerCase())
        );
        expect(searchResults).toHaveLength(1);
        expect(searchResults[0].name).toBe('MacBook Pro');
    });
});
