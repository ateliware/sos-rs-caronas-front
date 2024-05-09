import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import axios, { AxiosError, AxiosResponse } from 'axios';

export type RepositoryParams = {
  q?: string;
  page?: number;
  size?: number;
  order?: string;
  joins?: string[];
};

export type ApiResponse = {
  data: any;
  type?: 'success' | 'error';
  status?: number;
};

export type ErrorResponse = {
  isError: true;
  message: string;
  errors: any;
  status?: number;
};

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (
      ['post', 'patch', 'put', 'delete'].includes(response.config.method || '')
    ) {
      if (response.request.responseURL.includes('/login')) {
        toast.success('Bem-vindo!');
      } else {
        toast.success('Sucesso!');
      }
    }

    return response;
  },
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      !error.response?.request.responseURL.includes('/login')
    ) {
      return dispatchEvent(new Event('logout'));
    }
    showError<AxiosError>(error);
    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    );
  }
);

const codeErrors: { [code: string]: string } = {
  ERR_NETWORK: "Can't connect to server",
  ERR_CONNECTION_REFUSED: "Can't connect to server",
  ECONNABORTED: 'Request timeout',
};

const statusErrors: { [status: number]: string } = {
  500: 'Internal server error',
  404: 'Resource not found',
};

export function showError<T>(err: AxiosError) {
  const dataResponse = err.response?.data as DataResponse<T>;
  const errorCode = err.code ?? 'no code';
  const status = err.response?.status ?? 0;

  const errorMessage =
    dataResponse?.error ?? codeErrors[errorCode] ?? statusErrors[status];

  if (errorMessage) toast.error(errorMessage);
}

type ErrorName<T> = 'root' | `root.${string}` | Path<T>;
type DataResponse<T> = { errors?: Errors<T>; error?: string };
type Errors<T> = Record<ErrorName<T>, string[]>;

export function handleErrorForm<T extends FieldValues>(
  setError: UseFormSetError<T>
) {
  return (err: AxiosError) => {
    const errors = (err.response?.data as DataResponse<T>)?.errors;
    if (errors) {
      const objectError = parseErrorToObject<T>(errors);
      Object.entries(objectError).forEach(([field, messages]) => {
        setError(field as ErrorName<T>, {
          type: 'server',
          message: messages[0],
        });
      });
    }
    return err.response as AxiosResponse<{ errors: Record<string, string> }>;
  };

  function parseErrorToObject<T extends FieldValues>(obj: Errors<T>) {
    const objectError = {} as Errors<T>;

    for (const key in obj) {
      if (
        typeof obj[key as ErrorName<T>] === 'object' &&
        obj[key as ErrorName<T>] !== null &&
        !Array.isArray(obj[key as ErrorName<T>])
      ) {
        const nestedObj = parseErrorToObject(
          obj[key as ErrorName<T>] as unknown as Errors<T>
        );
        Object.keys(nestedObj).forEach((nestedKey) => {
          objectError[`${key}.${nestedKey}` as ErrorName<T>] =
            nestedObj[nestedKey as ErrorName<T>];
        });
      } else {
        objectError[key as ErrorName<T>] = obj[key as ErrorName<T>];
      }
    }

    return objectError;
  }
}
