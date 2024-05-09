import { login, setAuthorization } from './calls';
import { api } from '..';

describe('setAuthorization', () => {
  it('should set the Authorization header with a valid token', () => {
    const token = 'valid_token';
    setAuthorization(token);
    expect(api.defaults.headers.common.Authorization).toBe(`Bearer ${token}`);
  });

  it('should clear the Authorization header with a null token', () => {
    const token = null;
    setAuthorization(token);
    expect(api.defaults.headers.common.Authorization).toBe('');
  });
});

describe('login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call api.post with the correct arguments', async () => {
    const email = 'user@mail.com';
    const password = 'password';

    api.post = jest
      .fn()
      .mockImplementation(async () => Promise.resolve({ data: {} }));

    await login(email, password);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('/login', { email, password });
  });
});
