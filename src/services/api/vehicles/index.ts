import {
  RemoteVehicle,
  RemoteVehicleFormParams,
  VehicleFormParams,
} from 'interfaces/Vehicles';
import { create, list, retrieve } from './calls';
import { convertToBase64 } from '@utils/file/file';

export * from './calls';

export default class VehiclesAPICaller {
  static loadVehicles = async () => {
    const vehicles = await list<RemoteVehicle[]>();

    return vehicles.data.map((vehicle) => ({
      ...vehicle,
      isVerified: vehicle.is_verified,
      platePicture: vehicle.plate_picture,
      vehiclePicture: vehicle.vehicle_picture,
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

  static registerVehicle = async (data: VehicleFormParams) => {
    const platePictureBase64 = await convertToBase64(data.platePicture);
    const vehiclePictureBase64 = await convertToBase64(data.vehiclePicture);
    const cnhPictureBase64 = await convertToBase64(data.cnhPicture);

    await create<RemoteVehicleFormParams>({
      ...data,
      plate_picture: platePictureBase64,
      vehicle_picture: vehiclePictureBase64,
      cnh_picture: cnhPictureBase64,
      is_verified: false,
    });
  };
}
