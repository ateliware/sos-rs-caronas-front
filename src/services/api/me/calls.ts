import { Me } from 'interfaces/Me';
import { objectToFormData } from '@services/io/file';

import { api } from '../';

export const retrieve = async <T>() => {
  return api.get<T>('/me');
};

export const update = async (params: Me) => {
  return api.patch('/me', { ...params });
};

export const updateImage = async (params: Partial<Me>) => {
  return api.post('/me/image', objectToFormData(params), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updatePassword = async (
  params: Partial<Me> & {
    oldPassword?: string;
  }
) => {
  return api.post('/me/password', { ...params });
};
