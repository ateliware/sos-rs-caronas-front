import maskToCurrency from './currency';

describe('maskToCurrency', () => {
  test('should format value to Brazilian currency with one digit', () => {
    const nextState = { value: '1', selection: null };
    const expectedOutput = {
      value: 'R$ 0,01',
      selection: { start: 7, end: 7 },
    };
    expect(maskToCurrency({ nextState, currency: 'Brazilian' })).toEqual(
      expectedOutput
    );
  });

  test('should format value to Brazilian currency with two digits', () => {
    const nextState = { value: '20', selection: null };
    const expectedOutput = {
      value: 'R$ 0,20',
      selection: { start: 7, end: 7 },
    };
    expect(maskToCurrency({ nextState, currency: 'Brazilian' })).toEqual(
      expectedOutput
    );
  });

  test('should format value to Brazilian currency with more than two digits', () => {
    const nextState = { value: '123456', selection: null };
    const expectedOutput = {
      value: 'R$ 1.234,56',
      selection: { start: 11, end: 11 },
    };
    expect(maskToCurrency({ nextState, currency: 'Brazilian' })).toEqual(
      expectedOutput
    );
  });

  test('should format value to American currency', () => {
    const nextState = { value: '1234.56', selection: null };
    const expectedOutput = {
      value: '$1,234.56',
    };
    expect(maskToCurrency({ nextState, currency: 'American' }).value).toEqual(
      expectedOutput.value
    );
  });
});
