import { RemotePerson } from 'interfaces/Person';
import { api } from '..';

export const register = async (params: RemotePerson) => {
  return api.post('/person/register/', { ...params });
};

export const sendCode = async (phone: string) => {
  return api.post('/validate_phone/send_code/', { phone });
};
