export type State = {
  id: number;
  name: string;
  code: string;
};

export type City = {
  id: number;
  name: string;
  isActive: boolean;
  state: State;
  label?: string;
};

export type RemoteCity = {
  id: number;
  name: string;
  is_active: boolean;
  state: State;
};

export type AffectPlaces = {
  uuid: string;
  description: string;
  address: string;
  city: City;
  mainPerson: string;
  mainContact: string;
  informations: string;
};

export type RemoteAffectPlaces = {
  uuid: string;
  description: string;
  address: string;
  city: City;
  main_person: string;
  main_contact: string;
  informations: string;
};
