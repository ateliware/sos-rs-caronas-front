import { validateUUIDFormat } from './uuid';

describe('validateUUIDFormat', () => {
  it('returns true for valid UUID', () => {
    const uuid = 'e80d0d1e-3c3d-4b3f-b4e8-7f2ad99f4e7e';
    expect(validateUUIDFormat(uuid)).toBe(true);
  });

  it('returns false for invalid UUID', () => {
    const uuid = 'invalid-uuid';
    expect(validateUUIDFormat(uuid)).toBe(false);
  });

  it('is case-insensitive', () => {
    const uuid = 'E80D0D1E-3C3D-4B3F-B4E8-7F2AD99F4E7E';
    expect(validateUUIDFormat(uuid)).toBe(true);
  });
});
