import { formatPhone } from './phone';

describe('Format Phone', () => {
  test('Format Phone', () => {
    const string1 = '54999747908';
    const string2 = '9999999999';
    const string3 = '123';
    const string4 = '(54) 99974-7908';

    expect(formatPhone(string1)).toEqual('(54) 99974-7908');
    expect(formatPhone(string2)).toEqual('(99) 9999-9999');
    expect(formatPhone(string3)).toEqual('123');
    expect(formatPhone(string4)).toEqual('(54) 99974-7908');
  });
});
