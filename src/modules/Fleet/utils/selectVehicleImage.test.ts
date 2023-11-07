import solo from 'src/assets/solo.svg';
import { describe, expect, test } from 'vitest';

import { selectVehicleImage } from './selectVehicleImage';

describe('Select vehicle image', () => {
  test('For type solo return solo path', () => {
    const path = selectVehicleImage('solo');
    expect(path).toBe(solo);
  });
});
