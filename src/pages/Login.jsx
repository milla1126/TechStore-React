import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
       e.preventDefault();

      try {
        const data = await loginUser(
          formData.email,
          formData.password
       );

        localStorage.setItem("token", data.token);

        setUser(data.user); // desde AuthContext

       navigate("/");
    } catch (error) {
      alert("Correo o contraseña incorrectos");
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
                    TecStore
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                    Inicia sesión para continuar
                </p>

                {error && (
                    <div style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--color-error)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        textAlign: 'center',
                        border: '1px solid var(--color-error)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
                        Ingresar
                    </Button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    ¿No tienes una cuenta? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Regístrate</Link>
                </p>
            </div>
        </div>
    );
};
