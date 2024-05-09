import {
  encodeDate,
  parseDate,
  parseDateHour,
  parseDateHourToIsoString,
} from './dates';

describe('parseDate', () => {
  it('should return the expected parsed date', () => {
    const input = '2023-06-13T00:00:00';
    const expectedOutput = '13/06/2023';

    const result = parseDate(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should return the input if no date is provided', () => {
    const input = '';
    const expectedOutput = '';

    const result = parseDate(input);

    expect(result).toEqual(expectedOutput);
  });
});

describe('encodeDate', () => {
  it('should return the expected encoded date', () => {
    const input = '13/06/2023';
    const expectedOutput = '2023-06-13';

    const result = encodeDate(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should return the input if no date is provided', () => {
    const input = '';
    const expectedOutput = '';

    const result = encodeDate(input);

    expect(result).toEqual(expectedOutput);
  });
});

describe('parseDateHourToIsoString', () => {
  test('should return the input if no date is provided', () => {
    const result = parseDateHourToIsoString();
    expect(result).toBe('');
  });

  test('Should return the isoString', () => {
    const result = parseDateHourToIsoString('12/01/2000 18:30');
    expect(result).toBe('2000-01-12T18:30:00.000Z');
  });

  test('Should return the isoString 2', () => {
    const result = parseDateHourToIsoString('28/02/2023 08:15');
    expect(result).toBe('2023-02-28T08:15:00.000Z');
  });
});

describe('parseDateHour', () => {
  test('Should return an empty string if no parameter is provided', () => {
    expect(parseDateHour()).toBe('');
  });

  test('Should correctly format a date and time', () => {
    const dateHour = '2000-01-12T18:30:00.000Z';
    const expectedOutput = '12/01/2000 18:30';

    expect(parseDateHour(dateHour)).toBe(expectedOutput);
  });

  test('Should return an empty string if date and time are not provided', () => {
    const dateHour = '';
    expect(parseDateHour(dateHour)).toBe('');
  });
});
