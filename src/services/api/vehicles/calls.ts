import { api } from '..';

export const list = async <T>() => {
  return api.get<T>('/vehicles/');
};

export const retrieve = async <T>(id: string) => {
  return api.get<T>(`/vehicles/${id}/`);
};
