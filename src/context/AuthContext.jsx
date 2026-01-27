import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const ROLES = {
    CLIENT: 'client',
    ADMIN: 'admin',
    VENDOR: 'vendor',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize/Load Users "Database"
    useEffect(() => {
        const storedUsers = localStorage.getItem('techstore_users');
        if (!storedUsers) {
            // Create default admin if not exists
            const defaultAdmin = {
                id: 'admin-1',
                email: 'admin@techstore.com',
                password: 'admin123', // In real app, hash this!
                name: 'Admin User',
                role: ROLES.ADMIN,
                plan: 'Enterprise'
            };
            localStorage.setItem('techstore_users', JSON.stringify([defaultAdmin]));
        }

        // Check active session
        const sessionUser = localStorage.getItem('techstore_session');
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const storedUsers = JSON.parse(localStorage.getItem('techstore_users') || '[]');

        const foundUser = storedUsers.find(u => u.email.toLowerCase() === normalizedEmail && u.password === password);

        if (foundUser) {
            // Remove password from session object
            const { password, ...sessionData } = foundUser;
            setUser(sessionData);
            localStorage.setItem('techstore_session', JSON.stringify(sessionData));
            return { success: true };
        }

        const emailExists = storedUsers.some(u => u.email.toLowerCase() === normalizedEmail);
        if (!emailExists) {
            return { success: false, message: 'El correo no está registrado' };
        }

        return { success: false, message: 'Contraseña incorrecta' };
    };

    const register = (data) => {
        const normalizedEmail = data.email.trim().toLowerCase();
        const storedUsers = JSON.parse(localStorage.getItem('techstore_users') || '[]');

        if (storedUsers.some(u => u.email.toLowerCase() === normalizedEmail)) {
            return { success: false, message: 'El correo ya está registrado' };
        }

        const newUser = {
            id: Date.now().toString(),
            ...data,
            email: normalizedEmail, // Store normalized email
            role: ROLES.CLIENT,
            plan: 'Free'
        };

        storedUsers.push(newUser);
        localStorage.setItem('techstore_users', JSON.stringify(storedUsers));

        // Auto login
        const { password, ...sessionData } = newUser;
        setUser(sessionData);
        localStorage.setItem('techstore_session', JSON.stringify(sessionData));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('techstore_session');
    };

    const updateUser = (updatedData) => {
        setUser(prev => {
            const newState = { ...prev, ...updatedData };
            localStorage.setItem('techstore_session', JSON.stringify(newState));
            return newState;
        });

        // Also update in "database"
        const storedUsers = JSON.parse(localStorage.getItem('techstore_users') || '[]');
        const userIndex = storedUsers.findIndex(u => u.email === user.email);
        if (userIndex >= 0) {
            storedUsers[userIndex] = { ...storedUsers[userIndex], ...updatedData };
            localStorage.setItem('techstore_users', JSON.stringify(storedUsers));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading, ROLES }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
