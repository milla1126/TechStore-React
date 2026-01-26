import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from './ProductCard';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const mockProduct = {
    id: 1,
    name: 'Gaming Laptop',
    category: 'Laptops',
    price: 1500,
    image: 'laptop.jpg',
    isNew: true
};

describe('ProductCard Component', () => {
    it('renders product information correctly', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );
        expect(screen.getByText('Gaming Laptop')).toBeInTheDocument();
        expect(screen.getByText('Laptops')).toBeInTheDocument();
        expect(screen.getByText('$1500')).toBeInTheDocument();
        expect(screen.getByText('NUEVO')).toBeInTheDocument();
    });

    it('contains a link to the product details', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/product/1');
    });
});
