import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher Component', () => {
    it('renders the toggle button', () => {
        render(<ThemeSwitcher />);
        expect(screen.getByText(/Cambiar Tema/i)).toBeInTheDocument();
    });

    it('opens theme menu when clicked', () => {
        render(<ThemeSwitcher />);
        const button = screen.getByText(/Cambiar Tema/i);
        fireEvent.click(button);
        expect(screen.getByText('🟢 Gamer Zone')).toBeInTheDocument();
    });

    it('changes theme choice and closes menu', () => {
        render(<ThemeSwitcher />);
        fireEvent.click(screen.getByText(/Cambiar Tema/i));
        const gamerTheme = screen.getByText('🟢 Gamer Zone');
        fireEvent.click(gamerTheme);
        expect(screen.queryByText('🟢 Gamer Zone')).not.toBeInTheDocument();
    });
});
