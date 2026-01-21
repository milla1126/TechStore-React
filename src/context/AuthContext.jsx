import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const ROLES = {
    CLIENT: 'client',
    ADMIN: 'admin',
    VENDOR: 'vendor',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email) => {
        // Mock login with roles
        let role = ROLES.CLIENT;
        if (email.includes('admin')) role = ROLES.ADMIN;
        else if (email.includes('vendor')) role = ROLES.VENDOR;

        setUser({ 
            email, 
            name: email.split('@')[0], 
            role,
            plan: 'Free' 
        });
    };

    const register = (data) => {
        // Default to client for registration
        setUser({ ...data, role: ROLES.CLIENT, plan: 'Free' });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, ROLES }}>
            {children}
        </AuthContext.Provider>
    );
};
