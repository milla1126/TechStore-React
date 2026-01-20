import React from 'react';

export const Input = ({ label, id, error, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            {label && (
                <label
                    htmlFor={id}
                    style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--color-text-secondary)'
                    }}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: error ? 'var(--color-error)' : 'var(--color-bg-surface)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    color: 'var(--color-text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = error ? 'var(--color-error)' : 'var(--color-bg-surface)'}
                {...props}
            />
            {error && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>
                    {error}
                </span>
            )}
        </div>
    );
};
