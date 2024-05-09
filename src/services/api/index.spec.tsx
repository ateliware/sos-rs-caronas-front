import { ToastContainer } from 'react-toastify';

import { render, screen } from '@testing-library/react';

import { handleErrorForm, showError } from '.';

describe('showError', () => {
  it('should print toast an error message', async () => {
    render(<ToastContainer />);

    const err = { code: 'ERR_NETWORK' } as any;
    showError(err);
    expect(
      await screen.findByText("Can't connect to server")
    ).toBeInTheDocument();
  });
});

describe('handleErrorForm', () => {
  it('should set validation errors on form', async () => {
    const setError = jest.fn();
    const err = {
      response: {
        data: {
          errors: {
            email: ['is required'],
            password: ['is too weak'],
          },
        },
      },
    } as any;
    await handleErrorForm(setError)(err);

    expect(setError).toHaveBeenCalledWith('email', {
      type: 'server',
      message: 'is required',
    });

    expect(setError).toHaveBeenCalledWith('password', {
      type: 'server',
      message: 'is too weak',
    });
  });

  it('should set validation errors on form when has FieldArray', async () => {
    const setError = jest.fn();
    const err = {
      response: {
        data: {
          errors: {
            openTimes: {
              '0': {
                start: ['Não pode ser depois do horário de término'],
                days: ['Não é um dia da semana válido'],
              },
            },
          },
        },
      },
    } as any;
    await handleErrorForm(setError)(err);

    expect(setError).toHaveBeenCalledWith('openTimes.0.start', {
      type: 'server',
      message: 'Não pode ser depois do horário de término',
    });

    expect(setError).toHaveBeenCalledWith('openTimes.0.days', {
      type: 'server',
      message: 'Não é um dia da semana válido',
    });
  });
});
