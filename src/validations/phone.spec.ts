import { formPhonePattern } from './phone';

describe('formPhonePattern', () => {
  it('Should be an invalid phone', () => {
    const invalidPhone = '99769797721';
    const validationResult = formPhonePattern.pattern.value.test(invalidPhone);
    expect(validationResult).toBeFalsy();
    expect(formPhonePattern.pattern.message).toBe('invalid phone');
  });

  it('Should be a valid phone', () => {
    const validPhone = '(99) 99999-9999';
    const validationResult = formPhonePattern.pattern.value.test(validPhone);
    expect(validationResult).toBeTruthy();
  });
});
