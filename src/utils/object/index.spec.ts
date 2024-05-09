import { reverseKeyValueObject } from '.';

describe('reverseKeyValueObject', () => {
  it('should return an empty object when given an empty object', () => {
    const input = {};
    const output = {};
    expect(reverseKeyValueObject(input)).toEqual(output);
  });

  it('should return a reversed key-value object when given a valid input', () => {
    const input = { a: '1', b: '2', c: '3' };
    const output = { 1: 'a', 2: 'b', 3: 'c' };
    expect(reverseKeyValueObject(input)).toEqual(output);
  });

  it('should handle objects with duplicate values by overwriting keys', () => {
    const input = { a: '1', b: '2', c: '1' };
    const output = { 1: 'c', 2: 'b' };
    expect(reverseKeyValueObject(input)).toEqual(output);
  });

  it('should handle objects with non-string values by converting them to strings', () => {
    const input = { a: 1, b: true, c: [1, 2, 3] };
    const output = { '1': 'a', true: 'b', '1,2,3': 'c' };
    expect(reverseKeyValueObject(input as any)).toEqual(output);
  });
});
