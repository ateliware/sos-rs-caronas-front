import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockAPIFunction, writeOnInput } from '@test/helpers';
import * as userService from '@services/api/user';
import * as meService from '@services/api/me';

import UserForm from './UserForm';

jest.mock('@services/api/user', () => {
  const actualModule = jest.requireActual('@services/api/user');
  return {
    __esModule: true,
    ...actualModule,
    default: {
      ...actualModule.default,
    },
  };
});

jest.mock('@services/api/user/calls', () => ({
  retrieve: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
}));

jest.mock('@services/api/me/calls', () => ({
  update: jest.fn(),
  retrieve: jest.fn(),
}));

const response = {
  data: {
    user: {
      id: '36293b6c-8226-4c92-8254-0e12c5204a91',
      name: 'Ateli User',
      email: 'user@ateliware.com',
      age: 20,
    },
  },
};

describe('UserForm', () => {
  beforeEach(() => {
    mockAPIFunction(userService.retrieve, response);
    mockAPIFunction(userService.update, response);
    mockAPIFunction(userService.create, response);
    mockAPIFunction(meService.retrieve, response);
    mockAPIFunction(meService.update, response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Renders modal', async () => {
    await waitFor(() => {
      return render(<UserForm closeModal={() => {}} onSave={() => {}} />);
    });

    const saveButton = screen.getByText(/Salvar/i);
    expect(saveButton).toBeInTheDocument();
  });

  it('Fill modal with invalid data', async () => {
    await waitFor(() => {
      return render(<UserForm closeModal={() => {}} onSave={() => {}} />);
    });

    mockAPIFunction(userService.update, {
      data: {
        errors: {
          email: 'problem with the email',
          name: ' name empty',
        },
      },
    });

    const user = userEvent.setup();
    const userCredentials = {
      email: 'user',
      password: '!Passwor',
      name: '',
    };

    const emailInput: HTMLInputElement = screen.getByPlaceholderText(/E-mail/i);
    const nameInput: HTMLInputElement = screen.getByPlaceholderText(/Nome/i);
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText(/Senha/i);
    const saveButton: HTMLButtonElement = screen.getByText(/Salvar/i);
    writeOnInput(nameInput, userCredentials.name);
    writeOnInput(passwordInput, userCredentials.password);

    await user.click(saveButton);

    expect(screen.getAllByText(/Obrigatório/i).length).toBeGreaterThan(0);

    writeOnInput(emailInput, userCredentials.email);

    await user.click(saveButton);
    expect(screen.getByText(/E-mail inválido/i)).toBeInTheDocument();
  });

  it('Fill modal in update scenario', async () => {
    await waitFor(() => {
      return render(
        <UserForm editId="123" closeModal={() => {}} onSave={() => {}} />
      );
    });

    const nameInput: HTMLInputElement = await screen.findByPlaceholderText(
      /Nome/i
    );
    expect(nameInput).toHaveValue(response.data.user.name);
    const emailInput: HTMLInputElement = await screen.findByPlaceholderText(
      /E-mail/i
    );
    expect(emailInput).toHaveValue(response.data.user.email);
  });

  it('Fill modal in update scenario /me', async () => {
    const { container } = await waitFor(() => {
      return render(
        <UserForm closeModal={() => {}} editId="123" isMe onSave={() => {}} />
      );
    });

    const form = container.querySelector('form')!;

    await waitFor(() => {
      const nameInput: HTMLInputElement = screen.getByPlaceholderText(/Nome/i);
      expect(nameInput).toHaveValue(response.data.user.name);
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(meService.update).toBeCalledTimes(1);
    });
  });
});
