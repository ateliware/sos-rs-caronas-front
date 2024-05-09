import { RemotePerson } from 'interfaces/Person';
import { api } from '..';

export const register = async (params: RemotePerson) => {
  return api.post('/person/register/', { ...params });
};
