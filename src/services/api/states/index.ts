import { list, retrieve } from './calls';
import { State } from 'interfaces/Cities';
export * from './calls';

export default class StatesAPICaller {
  static loadStates = async () => {
    const states = await list<State[]>();

    return states.data;
  };

  static loadState = async (id: string) => {
    const city = await retrieve<State>(id);

    return city.data;
  };
}
