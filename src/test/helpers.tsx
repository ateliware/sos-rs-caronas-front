import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '@contexts/AuthProvider';

import { ConfirmationModalProvider } from '@contexts/ConfirmationContext';

import { fireEvent } from '@testing-library/react';
import { AxiosError, AxiosResponse } from 'axios';

// Import ResizeObserver
import ResizeObserver from 'resize-observer-polyfill';

// Use ResizeObserver to set up a mock implementation of the browser API
window.ResizeObserver = ResizeObserver;

export const writeOnInput = (
  input: HTMLInputElement | HTMLElement,
  content: number | string
) => {
  fireEvent.change(input, { target: { value: content } });
};

interface DataProps {
  dataName: string;
  dataValue?: string | number | boolean;
  dataIntervalNumber?: {
    minValue: number;
    maxValue: number;
  };
  dataIntervalOptions?: (string | number)[];
  dataIntervalString?: string;
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomString = (chars: string) => {
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

type ChartDataObject = Record<string, any>;
type MockedFunction = (...args: any) => any;
type MockedResponse = AxiosResponse | { [key: string]: any };

const generateNewId = (data: any) => {
  let newId: string;

  do {
    newId = Math.floor(10000 + Math.random() * 90000).toString();
    // eslint-disable-next-line no-loop-func
  } while (data.some((bar: any) => bar.keyBar === newId));

  return newId;
};

export const generateDataForChart = (
  length: number,
  dataProps: DataProps[]
): ChartDataObject[] => {
  const newData: ChartDataObject[] = [];

  for (let i = 0; i < length; i++) {
    const currentObject: ChartDataObject = {};

    currentObject['barKey'] = generateNewId(newData);

    dataProps.forEach(
      ({
        dataName,
        dataValue,
        dataIntervalNumber,
        dataIntervalOptions,
        dataIntervalString,
      }) => {
        if (dataValue) {
          currentObject[dataName] = dataValue;
        } else if (dataIntervalNumber) {
          currentObject[dataName] = generateRandomNumber(
            dataIntervalNumber.minValue,
            dataIntervalNumber.maxValue
          );
        } else if (dataIntervalOptions) {
          currentObject[dataName] =
            dataIntervalOptions[
              Math.floor(Math.random() * dataIntervalOptions.length)
            ];
        } else if (dataIntervalString) {
          currentObject[dataName] =
            'Fazenda ' + generateRandomString(dataIntervalString);
        }
      }
    );

    newData.push(currentObject);
  }

  return newData;
};

export const hexToRgb = (hex: string) => {
  const hexValues = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

  if (!hexValues) {
    return null;
  }

  const r = parseInt(hexValues[1], 16);
  const g = parseInt(hexValues[2], 16);
  const b = parseInt(hexValues[3], 16);

  return { r, g, b };
};

export function mockAPIFunction(
  func: MockedFunction,
  response: MockedResponse = { data: {} } as AxiosResponse
) {
  (func as jest.MockedFunction<typeof func>).mockResolvedValue(response);
}

export function mockAPIError(
  func: MockedFunction,
  error = new Error() as AxiosError
) {
  (func as jest.MockedFunction<typeof func>).mockRejectedValue(error);
}

export function getRandomItem<T>(list: T[]): T {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export const renderStub = (stub: JSX.Element) => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ConfirmationModalProvider>
          <AuthProvider>
            <Routes>
              <Route path="*" element={stub} />
            </Routes>
          </AuthProvider>
        </ConfirmationModalProvider>
      </BrowserRouter>
    </>
  );
};
