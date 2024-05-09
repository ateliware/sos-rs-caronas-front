import { api } from '..';

import { create, list, update, updatePassword } from './';

describe('User API Caller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('list', async () => {
    const email = 'user@mail.com';
    const q = 'user';

    const data = {
      users: {
        total: 1,
        result: [
          {
            id: '1f803026-5203-447b-b9b0-9b2df54b81b6',
            name: 'Fake user',
            email: 'fake@mail.com',
            admin: true,
            imageUrl: null,
          },
        ],
      },
    };

    api.get = jest.fn().mockImplementation(async () =>
      Promise.resolve({
        data,
      })
    );

    const result = await list({ q, email });

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/users', {
      params: { q, email },
    });

    expect(result.data).toEqual(data);
  });

  test('create', async () => {
    const userCredentials = {
      id: undefined,
      name: 'user 3',
      email: 'user4@ateliware.com',
      password: '!Password11',
      active: true,
      cpf: '12345678900',
    };

    api.post = jest
      .fn()
      .mockImplementation(async () => Promise.resolve({ data: {} }));

    await create(userCredentials);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('/users', userCredentials);
  });

  test('update', async () => {
    const userCredentials = {
      id: '123',
      name: 'user 3',
      email: 'test@test.com',
      active: true,
      cpf: '12345678900',
    };

    api.patch = jest
      .fn()
      .mockImplementation(async () => Promise.resolve({ data: {} }));

    await update(userCredentials);

    expect(api.patch).toHaveBeenCalledTimes(1);
    expect(api.patch).toHaveBeenCalledWith(
      `/users/${userCredentials.id}`,
      userCredentials
    );
  });

  test('updatePassword', async () => {
    const userId = 'user_id';
    const userCredentials = {
      password: 'Aa@12345',
    };

    api.put = jest
      .fn()
      .mockImplementation(async () => Promise.resolve({ data: {} }));

    await updatePassword(userId, userCredentials);

    expect(api.put).toHaveBeenCalledTimes(1);
    expect(api.put).toHaveBeenCalledWith(
      `/users/${userId}/password`,
      userCredentials
    );
  });
});
