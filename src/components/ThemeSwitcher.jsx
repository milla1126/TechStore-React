import React, { useState, useEffect } from 'react';

const THEMES = {
    premium: {
        '--color-primary': '#3b82f6',
        '--color-primary-dark': '#2563eb',
        '--color-primary-light': '#60a5fa',
        '--color-accent': '#8b5cf6',
        '--color-bg-base': '#0f172a',
        '--color-bg-card': '#1e293b',
        '--color-text-primary': '#f8fafc',
        name: '🔵 Tech Premium'
    },
    gamer: {
        '--color-primary': '#22c55e', // Green
        '--color-primary-dark': '#15803d',
        '--color-primary-light': '#4ade80',
        '--color-accent': '#ef4444', // Red accent
        '--color-bg-base': '#000000', // Pitch black
        '--color-bg-card': '#111111',
        '--color-text-primary': '#00ff00', // Matrix green text style
        name: '🟢 Gamer Zone'
    },
    minimal: {
        '--color-primary': '#000000',
        '--color-primary-dark': '#333333',
        '--color-primary-light': '#666666',
        '--color-accent': '#d4d4d8',
        '--color-bg-base': '#ffffff',
        '--color-bg-card': '#f4f4f5',
        '--color-text-primary': '#18181b',
        name: '⚪ Minimal Light'
    }
};

export const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState('premium');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const theme = THEMES[currentTheme];
        const root = document.documentElement;
        Object.entries(theme).forEach(([key, value]) => {
            if (key !== 'name') {
                root.style.setProperty(key, value);
            }
        });
    }, [currentTheme]);

    return (
        <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 100 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-primary)',
                    color: 'var(--color-text-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-lg)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600
                }}
            >
                🎨 Cambiar Tema (Franquicia)
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: '3rem',
                    left: 0,
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-bg-surface)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    minWidth: '150px',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    {Object.entries(THEMES).map(([key, theme]) => (
                        <button
                            key={key}
                            onClick={() => { setCurrentTheme(key); setIsOpen(false); }}
                            style={{
                                textAlign: 'left',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: currentTheme === key ? 'var(--color-primary)' : 'transparent',
                                color: currentTheme === key ? 'white' : 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {theme.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
