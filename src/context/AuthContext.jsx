import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email) => {
        // Mock login
        setUser({ email, name: email.split('@')[0], plan: 'Free' });
    };

    const register = (data) => {
        // Mock register
        setUser({ ...data, plan: 'Free' });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
