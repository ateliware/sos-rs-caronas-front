import { api } from '..';

import { list, retrieve } from '.';

describe('StatesAPICaller API Caller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('list', async () => {
    const data = [
      {
        id: 1,
        name: 'Rio Grande do Sul',
        code: 'RS',
      },
      {
        id: 2,
        name: 'Santa Catarina',
        code: 'SC',
      },
    ];

    api.get = jest.fn().mockImplementation(async () => Promise.resolve(data));

    const result = await list();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/states');

    expect(result).toEqual(data);
  });

  test('retrieve', async () => {
    const data = {
      id: 1,
      name: 'Rio Grande do Sul',
      code: 'RS',
    };

    api.get = jest.fn().mockImplementation(async () => Promise.resolve(data));

    const result = await retrieve('1');

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/states/1');

    expect(result).toEqual(data);
  });
});
