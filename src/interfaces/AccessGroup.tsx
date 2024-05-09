import { Permissions } from './Permissions';
import { User } from './User';

export interface AccessGroup {
  id?: string | null;
  name: string;
  permissions: Permissions;
  users?: User[];
}
