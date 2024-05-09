import { objectToFormData } from '@services/io/file';

import { api } from '..';

import { update, updateImage, updatePassword } from '.';

describe('api test', () => {
  afterEach(() => {
    jest.resetAllMocks();
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
    expect(api.patch).toHaveBeenCalledWith(`/me`, userCredentials);
  });

  test('updatePassword', async () => {
    const userCredentials = {
      password: 'Aa@12345',
    };

    api.post = jest
      .fn()
      .mockImplementation(async () => Promise.resolve({ data: {} }));

    await updatePassword(userCredentials);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith(`/me/password`, userCredentials);
  });

  test('updateImage', async () => {
    const params = {
      image: Buffer.from('foo'),
    };

    api.post = jest
      .fn()
      .mockImplementation(async () => Promise.resolve({ data: {} }));

    await updateImage(params);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith(
      '/me/image',
      objectToFormData(params),
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  });
});
