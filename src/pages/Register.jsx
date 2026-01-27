import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        const result = register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        if (result.success) {
            navigate('/profile');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="container" style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2rem',
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-bg-surface)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Únete a TechStore
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                    Crea tu cuenta y accede a ofertas exclusivas
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Input
                        label="Nombre Completo"
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Correo Electrónico"
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Contraseña"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Confirmar Contraseña"
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
                        Crear Cuenta
                    </Button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};
