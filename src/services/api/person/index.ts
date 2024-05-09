import { register } from './calls';
import { RemotePerson } from 'interfaces/Person';
export * from './calls';

export default class PersonAPICaller {
  static register = async (remotePerson: RemotePerson) => {
    const person = await register(remotePerson);
    console.log(person);
  };
}
