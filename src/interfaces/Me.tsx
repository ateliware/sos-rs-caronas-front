import { User } from './User';

export interface Me extends User {
  image?: Buffer;
  admin?: boolean;
  password?: string;
}
