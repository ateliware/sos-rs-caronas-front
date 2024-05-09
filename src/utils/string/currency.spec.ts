import { formatCurrency, formatValue } from './currency';

describe('formatCurrency', () => {
  test('should convert number to currency string format', () => {
    const value = 1234.56;
    const expected = 'R$1.234,56';
    expect(formatCurrency(value)?.replace(/[^0-9a-zA-Z$,.]/g, '')).toEqual(
      expected
    );
  });

  test('should convert zero to currency string format', () => {
    const value = 0;
    const expected = 'R$0,00';
    expect(formatCurrency(value)?.replace(/[^0-9a-zA-Z$,.]/g, '')).toEqual(
      expected
    );
  });
});

describe('formatValue', () => {
  test('should convert string with comma to number', () => {
    const value = '1.234,56';
    const expected = 1234.56;
    expect(formatValue(value)).toEqual(expected);
  });

  test('should convert string without comma to number', () => {
    const value = '1234';
    const expected = 1234;
    expect(formatValue(value)).toEqual(expected);
  });

  test('should remove non-numeric characters from string', () => {
    const value = 'R$ 1234,56';
    const expected = 1234.56;
    expect(formatValue(value)).toEqual(expected);
  });

  test('should return number if given a number', () => {
    const value = 1234.56;
    const expected = 1234.56;
    expect(formatValue(value)).toEqual(expected);
  });
});
