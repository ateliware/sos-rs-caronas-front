import { api } from '..';

export const list = async <T>() => {
  return api.get<T>('/states');
};

export const retrieve = async <T>(id: string) => {
  return api.get<T>(`/states/${id}`);
};
