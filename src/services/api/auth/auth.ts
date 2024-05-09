import { api } from '..';

export const setAuthorization = (token: string | null) => {
  const authorization = token ? `Bearer ${token}` : '';
  api.defaults.headers.common.Authorization = authorization;
};

export const login = async (cpf: string, password: string) => {
  return api.post('/token', { cpf, password });
};

export const sendEmailRecover = async (email: string) => {
  return api.post('/account/forgotPassword', { email });
};

export const validatePasswordResetToken = async (token: string) => {
  return api.get(`/account/recoverPassword/${token}`);
};

export const sendPasswordReset = async (token: string, password: string) => {
  return api.post(`/account/recoverPassword/${token}`, { password });
};
