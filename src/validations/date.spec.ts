import { formDatePattern } from './date';

describe('formDatePattern', () => {
  it('Should be invalid date', () => {
    const invalidDate = '32/13/2022';
    const validationResult = formDatePattern.pattern.value.test(invalidDate);
    expect(validationResult).toBeFalsy();
    expect(formDatePattern.pattern.message).toBe('invalid date');
  });

  it('Should be valid date', () => {
    const validDate = '14/04/2023';
    const validationResult = formDatePattern.pattern.value.test(validDate);
    expect(validationResult).toBeTruthy();
  });
});
