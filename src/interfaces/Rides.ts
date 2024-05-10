import { AffectPlaces, City, RemoteAffectPlaces, RemoteCity } from './Cities';
import { RemoteVehicle, Vehicle } from './Vehicles';

export type Ride = {
  date: Date;
  workShift: string;
  origin: City;
  destination: AffectPlaces;
  vehicle: Vehicle;
  quantityOfPassengers: string;
  status: string;
  notes: string;
};

export type RemoteRide = {
  date: Date;
  work_shift: string;
  origin: RemoteCity;
  destination: RemoteAffectPlaces;
  vehicle: RemoteVehicle;
  quantity_of_passengers: string;
  status: string;
  notes: string;
};

export type RideFormParams = {
  date: Date;
  workShift: string;
  origin: number;
  destination: string;
  vehicle: string;
  quantityOfPassengers: string;
  status: string;
  notes: string;
};

export type RemoteRideFormParams = {
  date: Date;
  work_shift: string;
  origin: number;
  destination: string;
  vehicle: string;
  quantity_of_passengers: string;
  status: string;
  notes: string;
};
