import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrders must be used within an OrderProvider');
    return context;
};

export const ORDER_STATUS = {
    PENDING: 'Pendiente',
    PROCESSING: 'Procesando',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado'
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = localStorage.getItem('techstore_orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    const saveOrders = (newOrders) => {
        setOrders(newOrders);
        localStorage.setItem('techstore_orders', JSON.stringify(newOrders));
    };

    const placeOrder = (cartItems, total, userDetails) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            status: ORDER_STATUS.PENDING,
            items: cartItems,
            total,
            userEmail: userDetails.email,
            shippingAddress: userDetails.address || 'Dirección no provista'
        };

        const updatedOrders = [newOrder, ...orders];
        saveOrders(updatedOrders);
        return newOrder;
    };

    const getOrdersByUser = (email) => {
        return orders.filter(o => o.userEmail === email);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        );
        saveOrders(updatedOrders);
    };

    return (
        <OrderContext.Provider value={{
            orders,
            placeOrder,
            getOrdersByUser,
            updateOrderStatus,
            ORDER_STATUS
        }}>
            {children}
        </OrderContext.Provider>
    );
};
