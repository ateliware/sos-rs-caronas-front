import { list, retrieve } from './calls';
import { RemoteCity } from 'interfaces/Cities';
export * from './calls';

export default class CitiesAPICaller {
  static loadCities = async () => {
    const cities = await list<RemoteCity[]>();

    return cities.data.map((city) => ({
      ...city,
      isActive: city.is_active,
    }));
  };

  static fetchCity = async (id: string) => {
    const city = await retrieve<RemoteCity>(id);

    return {
      ...city,
      isActive: city.data.is_active,
    };
  };
}
