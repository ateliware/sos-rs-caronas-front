import { formHourPattern } from './hour';

describe('formHourPattern', () => {
  it('Should be an invalid hour', () => {
    const invalidHour = '25:60';
    const validationResult = formHourPattern.pattern.value.test(invalidHour);
    expect(validationResult).toBeFalsy();
    expect(formHourPattern.pattern.message).toBe('invalid hour');
  });

  it('Should be a valid hour', () => {
    const validHour = '18:30';
    const validationResult = formHourPattern.pattern.value.test(validHour);
    expect(validationResult).toBeTruthy();
  });
});
