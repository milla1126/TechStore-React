import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyle = "btn";
    const variants = {
        primary: "btn-primary",
        outline: "border border-current text-primary hover:bg-primary/10",
        ghost: "hover:bg-gray-100 dark:hover:bg-slate-800"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };

    // Note: We are using regular CSS classes from index.css for now, mixed with some potential Tailwind utility-like names
    // But since we are strict Vanilla CSS + Tokens, let's stick to the classes defined in index.css
    // For this generic component, I'll rely mainly on the explicit props.

    let variantClass = variant === 'primary' ? 'btn-primary' : '';

    return (
        <button
            className={`${baseStyle} ${variantClass} ${className}`}
            style={{
                // Inline styles for quick improvements, ideally moved to CSS classes later
                cursor: 'pointer',
                opacity: props.disabled ? 0.7 : 1,
                ...props.style
            }}
            {...props}
        >
            {children}
        </button>
    );
};
