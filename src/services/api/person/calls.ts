import { RemotePerson } from 'interfaces/Person';
import { api } from '..';

export const register = async (params: RemotePerson) => {
  return api.post('/person/register/', { ...params });
};

export const sendCode = async (phone: string) => {
  return api.post('/validate_phone/send_code/', { phone });
};

export const checkCode = async (
  phone: string,
  code: string,
  validationUuid: string
) => {
  return api.post('/validate_phone/check_code/', {
    phone,
    code,
    validation_uuid: validationUuid,
  });
};
