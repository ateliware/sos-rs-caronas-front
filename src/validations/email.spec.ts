import { formEmailPattern } from './email';

describe('formEmailPattern', () => {
  it('Should be an invalid email', () => {
    const invalidEmail = 'invalid_email';
    const validationResult = formEmailPattern.pattern.value.test(invalidEmail);
    expect(validationResult).toBeFalsy();
    expect(formEmailPattern.pattern.message).toBe('E-mail inválido');
  });

  it('Should be a valid email', () => {
    const validEmail = 'example@example.com';
    const validationResult = formEmailPattern.pattern.value.test(validEmail);
    expect(validationResult).toBeTruthy();
  });
});
