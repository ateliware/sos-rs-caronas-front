import { formZipCodePattern } from './zipCode';

describe('formZipCodePattern', () => {
  it('Should be an invalid zipCode', () => {
    const invalidZipCode = 'invalid_zipCode';
    const validationResult =
      formZipCodePattern.pattern.value.test(invalidZipCode);
    expect(validationResult).toBeFalsy();
    expect(formZipCodePattern.pattern.message).toBe('invalid zipcode');
  });

  it('Should be an invalid zipCode 2', () => {
    const invalidZipCode = '99-205';
    const validationResult =
      formZipCodePattern.pattern.value.test(invalidZipCode);
    expect(validationResult).toBeFalsy();
    expect(formZipCodePattern.pattern.message).toBe('invalid zipcode');
  });

  it('Should be an invalid zipCode 3', () => {
    const invalidZipCode = '99250-00';
    const validationResult =
      formZipCodePattern.pattern.value.test(invalidZipCode);
    expect(validationResult).toBeFalsy();
    expect(formZipCodePattern.pattern.message).toBe('invalid zipcode');
  });

  it('Should be a valid zipCode', () => {
    const validZipCode = '99250-000';
    const validationResult =
      formZipCodePattern.pattern.value.test(validZipCode);
    expect(validationResult).toBeTruthy();
  });
});
