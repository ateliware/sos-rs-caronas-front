import { FieldValues, UseFormSetError } from 'react-hook-form';

import { Me } from 'interfaces/Me';
import { User } from 'interfaces/User';
import { handleErrorForm } from '@services/api';

import { retrieve, update, updateImage, updatePassword } from './calls';
export * from './calls';

export default class MeAPICaller {
  static adaptFromAPI = (data: Me) => data as FieldValues;
  static adaptToAPI = (data: FieldValues) => data as Me;

  static fetchMe = async () => {
    const { data } = await retrieve<{ user: User }>();
    return data.user;
  };

  static update = async <T extends FieldValues>(
    data: T,
    setError: UseFormSetError<T>
  ) => {
    const result = update(this.adaptToAPI(data)).catch(
      handleErrorForm(setError)
    );

    return result;
  };

  static updatePassword = async (
    data: FieldValues,
    setError: UseFormSetError<FieldValues>
  ) => {
    const response = await updatePassword({
      oldPassword: data.oldPassword,
      password: data.password,
    }).catch(handleErrorForm(setError));

    return response;
  };

  static updateImage = async (
    data: FieldValues,
    setError: UseFormSetError<FieldValues>
  ) => {
    const result = updateImage(this.adaptToAPI(data)).catch(
      handleErrorForm(setError)
    );

    return result;
  };
}
