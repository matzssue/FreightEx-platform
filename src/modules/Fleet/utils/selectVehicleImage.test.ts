import { selectVehicleImage } from './selectVehicleImage';
import { describe, expect, test } from 'vitest';
import solo from 'src/assets/solo.svg';

describe('Select vehicle image', () => {
  test('For type solo return solo path', () => {
    const path = selectVehicleImage('solo');
    expect(path).toBe(solo);
  });
});
