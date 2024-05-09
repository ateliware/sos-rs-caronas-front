import { api } from '..';

export const setAuthorization = (token: string | null) => {
  const authorization = token ? `Bearer ${token}` : '';
  api.defaults.headers.common.Authorization = authorization;
};

export const login = async (email: string, password: string) => {
  return api.post('/login', { email, password });
};
