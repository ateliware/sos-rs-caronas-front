export type Person = {
  cpf: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  emergencyPhone: string;
  emergencyContact: string;
  birthDate: string;
  avatar: string;
  city: string;
  lgpdAcceptance: boolean;
};

export type RemotePerson = {
  cpf: string;
  password: string;
  password_confirm: string;
  name: string;
  phone: string;
  emergency_phone: string;
  emergency_contact: string;
  birth_date: string;
  avatar: string;
  city_id: number;
  lgpd_acceptance: boolean;
  validation_uuid?: string;
};
