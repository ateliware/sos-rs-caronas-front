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
};

export type RemoteCity = {
  id: number;
  name: string;
  is_active: boolean;
  state: State;
};
