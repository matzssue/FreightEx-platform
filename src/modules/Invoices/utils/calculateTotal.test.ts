import { calculateTotal } from './calculateTotal';
import { describe, test, expect } from 'vitest';

describe('calculate total amount', () => {
  test('Returns sum of all prices', () => {
    const total = calculateTotal([{ price: 20 }, { price: 40 }, { price: 50 }]);
    expect(total).toBe(110);
  });
});
