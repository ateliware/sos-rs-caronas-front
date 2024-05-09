import { formSitePattern } from './site';

describe('formSitePattern', () => {
  const { pattern } = formSitePattern;

  it('Should be a valid site', () => {
    const validSite = 'https://meusite.com.br';
    expect(pattern.value.test(validSite)).toBe(true);
  });

  it('Should be a valid site with slash in last position', () => {
    const validSite = 'https://gocoffee.com.br/';
    expect(pattern.value.test(validSite)).toBe(true);
  });

  it('Should be a valid site with http', () => {
    const validSite = 'http://meusite.com.br';
    expect(pattern.value.test(validSite)).toBe(true);
  });

  it('Should be a valid site without https', () => {
    const validSite = 'meusite.com.br';
    expect(pattern.value.test(validSite)).toBe(true);
  });

  it('Should be a valid site with www', () => {
    const validSite = 'www.meusite.com.br';
    expect(pattern.value.test(validSite)).toBe(true);
  });

  it('Should be an invalid site', () => {
    const invalidSite = 'INVALID';
    expect(pattern.value.test(invalidSite)).toBe(false);
    expect(pattern.message).toEqual('invalid website');
  });
});
