export type Vehicle = {
  uuid: string;
  model: string;
  color: string;
  plate: string;
  platePicture: string;
  vehiclePicture: string;
  isVerified: boolean;
};

export type RemoteVehicle = {
  uuid: string;
  model: string;
  color: string;
  plate: string;
  plate_picture: string;
  vehicle_picture: string;
  is_verified: boolean;
};

export type VehicleFormParams = {
  cnh: string;
  model: string;
  color: string;
  plate: string;
  platePicture: File;
  vehiclePicture: File;
  cnhPicture: File;
  isVerified: boolean;
};

export type RemoteVehicleFormParams = {
  cnh_number: string;
  model: string;
  color: string;
  plate: string;
  plate_picture: string;
  vehicle_picture: string;
  cnh_picture: string;
  is_verified: boolean;
};
