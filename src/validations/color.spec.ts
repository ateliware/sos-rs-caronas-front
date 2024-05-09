import { formColorPattern } from './color';

describe('formColorPattern', () => {
  const { pattern } = formColorPattern;

  it('Should be a valid color', () => {
    const validColor = '#FFFFFF';
    expect(pattern.value.test(validColor)).toBe(true);
  });

  it('Should be an invalid color', () => {
    const invalidColor = 'INVALID';
    expect(pattern.value.test(invalidColor)).toBe(false);
    expect(pattern.message).toEqual('invalid color');
  });
});
