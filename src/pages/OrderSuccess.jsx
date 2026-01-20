import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const OrderSuccess = () => {
    return (
        <div className="container" style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                color: 'var(--color-success)',
                fontSize: '3rem'
            }}>
                ✓
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                ¡Gracias por tu compra!
            </h1>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '500px', marginBottom: '3rem' }}>
                Tu pedido ha sido procesado exitosamente. Te hemos enviado un correo con los detalles y el número de seguimiento.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/profile">
                    <Button variant="outline">Ver Pedido</Button>
                </Link>
                <Link to="/products">
                    <Button>Seguir Comprando</Button>
                </Link>
            </div>
        </div>
    );
};
