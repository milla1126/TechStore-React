import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2 style={{ marginBottom: '1rem' }}>No has iniciado sesión</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Accede a tu perfil para ver tus pedidos y configuraciones.
                </p>
                <Link to="/login">
                    <Button>Iniciar Sesión</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--color-bg-surface)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        {user.name[0].toUpperCase()}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.name}</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{user.email}</p>
                        <span style={{
                            display: 'inline-block',
                            marginTop: '0.5rem',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}>
                            Miembro {user.plan}
                        </span>
                        <span style={{
                            display: 'inline-block',
                            marginTop: '0.5rem',
                            marginLeft: '0.5rem',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: user.role === 'admin' ? 'var(--color-primary)' : user.role === 'vendor' ? 'var(--color-secondary)' : 'var(--color-bg-surface)',
                            border: '1px solid var(--color-bg-surface)',
                            color: user.role === 'admin' ? 'white' : 'var(--color-text-primary)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                        }}>
                            Rol: {user.role}
                        </span>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid var(--color-bg-surface)', paddingBottom: '0.5rem' }}>
                        Mis Pedidos Recientes
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        No tienes pedidos recientes.
                    </p>
                </div>

                <Button variant="outline" onClick={logout} style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
                    Cerrar Sesión
                </Button>
            </div>
        </div >
    );
};
