import { pageRange } from './TableHelper';

describe('pageRange', () => {
  test('total pages <= maxElements', () => {
    const result = pageRange(1, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('current <= pages_before', () => {
    const result = pageRange(2, 20);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('current + pages_after >= total_pages', () => {
    const result = pageRange(18, 20);
    expect(result).toEqual([16, 17, 18, 19, 20]);
  });

  test('otherwise', () => {
    const result = pageRange(10, 20);
    expect(result).toEqual([8, 9, 10, 11, 12]);
  });
});
