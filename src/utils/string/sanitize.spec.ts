import { removeAccents } from './sanitize';

describe('sanitize string', () => {
  test('removeAccents', () => {
    const string1 = 'São Paulo';
    const string2 = 'Paraná';
    const string3 = 'são paulo';
    const string4 = 'paraná';

    expect(removeAccents(string1)).toEqual('Sao Paulo');
    expect(removeAccents(string2)).toEqual('Parana');
    expect(removeAccents(string3)).toEqual('sao paulo');
    expect(removeAccents(string4)).toEqual('parana');
  });
});
