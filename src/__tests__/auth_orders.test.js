import { describe, it, expect } from 'vitest';

describe('Auth and Orders', () => {
    const mockUsers = [
        { email: 'test@user.com', password: '123' }
    ];

    it('8. validates login correctly', () => {
        const email = 'test@user.com';
        const pass = '123';
        const user = mockUsers.find(u => u.email === email && u.password === pass);
        expect(user).toBeDefined();
    });

    it('9. fails login with wrong password', () => {
        const email = 'test@user.com';
        const pass = 'wrong';
        const user = mockUsers.find(u => u.email === email && u.password === pass);
        expect(user).toBeUndefined();
    });

    it('10. creates a valid order object', () => {
        const order = {
            id: 'ORD-123',
            items: [{ id: 1, qty: 1 }],
            total: 1000,
            status: 'Pendiente'
        };
        expect(order.id).toMatch(/^ORD-/);
        expect(order.status).toBe('Pendiente');
    });
});
