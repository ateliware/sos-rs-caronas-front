import { checkCode, register, sendCode } from './calls';
import { RemotePerson } from 'interfaces/Person';
export * from './calls';

export default class PersonAPICaller {
  static register = async (remotePerson: RemotePerson) => {
    const person = await register(remotePerson);
    console.log(person);
  };

  static sendCode = async (phone: string) => {
    const response = await sendCode(phone);

    return {
      message: response.data.message,
      validationUuid: response.data.validation_uuid,
    };
  };

  static checkCode = async (
    phone: string,
    code: string,
    validationUuid: string
  ) => {
    const response = await checkCode(phone, code, validationUuid);

    return response.data;
  };
}
