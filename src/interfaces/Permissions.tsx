export interface Permissions {
  [context: string]: { [resource: string]: boolean };
}
