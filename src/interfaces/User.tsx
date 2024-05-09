import { ObjectWithNonNullableKey } from 'utils/object';

import { AccessGroup } from './AccessGroup';

export interface User {
  id?: string | null;
  name: string;
  cpf: string;
  email?: string;
  admin?: boolean;
  active: boolean;
  imageUrl?: string;
  accessGroupId?: string;
  accessGroup?: Partial<AccessGroup>;
}

export type UserWithId = ObjectWithNonNullableKey<User, 'id'>;
