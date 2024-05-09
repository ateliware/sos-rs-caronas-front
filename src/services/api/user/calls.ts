import { User } from 'interfaces/User';

import { RepositoryParams, api } from '../';

export type UserFilters = Partial<User & RepositoryParams>;

export const list = async <T>(params: UserFilters) => {
  return api.get<T>('/users', { params });
};

export const listAll = async () => {
  return api.get('/users/all');
};

export const create = async (params: User) => {
  return api.post('/users', { ...params });
};

export const update = async (params: User) => {
  return api.patch(`/users/${params.id}`, { ...params });
};

export const updatePassword = async (
  id: string,
  { password }: { password: string }
) => {
  return api.put(`/users/${id}/password`, { password });
};

export const retrieve = async <T>(id: string) => {
  return api.get<T>(`/users/${id}`);
};
