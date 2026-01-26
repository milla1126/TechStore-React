import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import React from 'react';

const TestComponent = () => {
    const { user, login, logout } = useAuth();
    return (
        <div>
            <div data-testid="user-email">{user ? user.email : 'no user'}</div>
            <button onClick={() => login('test@example.com')}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    it('provides null user by default', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        expect(screen.getByTestId('user-email')).toHaveTextContent('no user');
    });

    it('updates user on login', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText('Login').click();
        });

        expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    });

    it('clears user on logout', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText('Login').click();
        });
        expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');

        await act(async () => {
            screen.getByText('Logout').click();
        });
        expect(screen.getByTestId('user-email')).toHaveTextContent('no user');
    });
});
