import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
    it('renders with label correctly', () => {
        render(<Input label="Username" id="username" />);
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('updates value on change', () => {
        const handleChange = vi.fn();
        render(<Input id="test-input" onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test value' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('shows error message when provided', () => {
        render(<Input id="test-input" error="Field required" />);
        expect(screen.getByText('Field required')).toBeInTheDocument();
    });

    it('has correct placeholder', () => {
        render(<Input id="test-input" placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });
});
