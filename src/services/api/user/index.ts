import { FieldValues, UseFormSetError } from 'react-hook-form';

import { User } from 'interfaces/User';
import { handleErrorForm } from '@services/api';

import {
  UserFilters,
  create,
  list,
  listAll,
  retrieve,
  update,
  updatePassword,
} from './calls';
export * from './calls';

export default class UsersAPICaller {
  static adaptFromAPI = (data: User) => data as FieldValues;
  static adaptToAPI = (data: FieldValues) => data as User;

  static fetchUsers = async (filters: UserFilters) => {
    const { data } = await list<{ users: { result: User[]; total: number } }>(
      filters
    );
    return data.users;
  };

  static fetchUser = async (editId: string) => {
    const {
      data: { user },
    } = await retrieve<{ user: User }>(editId);

    return user;
  };

  static createOrUpdate = async <T extends FieldValues>(
    data: T,
    setError: UseFormSetError<T>
  ) => {
    const method = data.id ? update : create;

    const result = method(this.adaptToAPI(data)).catch(
      handleErrorForm(setError)
    );

    return result;
  };

  static setUserPassword = async (
    userId: string,
    password: string,
    setError: UseFormSetError<FieldValues>
  ) => {
    const response = await updatePassword(userId, { password }).catch(
      handleErrorForm(setError)
    );
    return response;
  };

  static listAll = async () => {
    const {
      data: { allUsers },
    } = await listAll();

    return {
      ...allUsers,
      result: allUsers.result,
    };
  };
}
