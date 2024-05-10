import {
  RemoteRide,
  RemoteRideFormParams,
  RideFormParams,
} from 'interfaces/Rides';
import { create, list, retrieve } from './calls';

export * from './calls';

export default class RidesAPICaller {
  static loadRides = async () => {
    const rides = await list<RemoteRide[]>();

    return rides.data.map((ride) => ({
      ...ride,
      workShift: ride.work_shift,
      quantityOfPassengers: ride.quantity_of_passengers,
      origin: {
        id: ride.origin.id,
        name: ride.origin.name,
        isActive: ride.origin.is_active,
        state: ride.origin.state,
      },
      destination: {
        ...ride.destination,
        mainPerson: ride.destination.main_person,
        mainContact: ride.destination.main_contact,
        city: {
          ...ride.destination.city,
          isActive: ride.origin.is_active,
        },
      },
      vehicle: {
        ...ride.vehicle,
        isVerified: ride.vehicle.is_verified,
        platePicture: ride.vehicle.plate_picture,
        vehiclePicture: ride.vehicle.vehicle_picture,
      },
    }));
  };

  static loadRideById = async (id: string) => {
    const ride = await retrieve<RemoteRide>(id);

    return {
      ...ride.data,
      workShift: ride.data.work_shift,
      quantityOfPassengers: ride.data.quantity_of_passengers,
      origin: {
        id: ride.data.origin.id,
        name: ride.data.origin.name,
        isActive: ride.data.origin.is_active,
        state: ride.data.origin.state,
      },
      destination: {
        ...ride.data.destination,
        mainPerson: ride.data.destination.main_person,
        mainContact: ride.data.destination.main_contact,
        city: {
          ...ride.data.destination.city,
          isActive: ride.data.origin.is_active,
        },
      },
      vehicle: {
        ...ride.data.vehicle,
        isVerified: ride.data.vehicle.is_verified,
        platePicture: ride.data.vehicle.plate_picture,
        vehiclePicture: ride.data.vehicle.vehicle_picture,
      },
    };
  };

  static registerRide = async (data: RideFormParams) => {
    await create<RemoteRideFormParams>({
      date: data.date,
      work_shift: data.workShift,
      origin: data.origin,
      destination: data.destination,
      vehicle: data.vehicle,
      quantity_of_passengers: data.quantityOfPassengers,
      status: data.status,
      notes: data.notes,
    });
  };
}
