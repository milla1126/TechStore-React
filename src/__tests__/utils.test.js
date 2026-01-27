import { describe, it, expect } from 'vitest';
import { formatPrice } from '../utils/format';

describe('formatPrice Utility', () => {
    it('1. formats a number as CLP currency', () => {
        const result = formatPrice(15000);
        // We check for part of the string as space characters can vary
        expect(result).toContain('15.000');
        expect(result).toContain('$');
    });

    it('2. handles zero correctly', () => {
        const result = formatPrice(0);
        expect(result).toContain('0');
    });
});
