import { api } from '..';

export const list = async <T>() => {
  return api.get<T>('/cities/');
};

export const retrieve = async <T>(id: string) => {
  return api.get<T>(`/cities/${id}/`);
};
