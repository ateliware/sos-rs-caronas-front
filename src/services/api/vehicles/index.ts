import { RemoteVehicle } from 'interfaces/Vehicles';
import { list, retrieve } from './calls';

export * from './calls';

export default class VehiclesAPICaller {
  static loadVehicles = async () => {
    const vehicles = await list<RemoteVehicle[]>();

    return vehicles.data.map((city) => ({
      ...city,
      isVerified: city.is_verified,
      platePicture: city.plate_picture,
      vehiclePicture: city.vehicle_picture,
    }));
  };

  static loadVehicleById = async (id: string) => {
    const vehicle = await retrieve<RemoteVehicle>(id);

    return {
      ...vehicle.data,
      isVerified: vehicle.data.is_verified,
      platePicture: vehicle.data.plate_picture,
      vehiclePicture: vehicle.data.vehicle_picture,
    };
  };
}
