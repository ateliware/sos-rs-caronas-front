import * as router from 'react-router';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockAPIFunction, writeOnInput } from '@test/helpers';
import * as authService from '@services/api/auth';
import { AxiosResponse } from 'axios';

import RecoverPasswordPage from './RecoverPasswordPage';

jest.mock('@services/api/auth/auth', () => ({
  sendEmailRecover: jest.fn(),
}));

const navigate = jest.fn();

describe('RecoverPasswordPage', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });
  it('renders', () => {
    render(<RecoverPasswordPage />);
  });

  it('sends email correctly', async () => {
    const user = userEvent.setup();
    const data = {
      email: 'user@mail.com',
    };

    mockAPIFunction(authService.sendEmailRecover, {} as AxiosResponse);

    render(<RecoverPasswordPage />);

    const emailInput: HTMLInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const sendButton: HTMLButtonElement = screen.getByText(/Enviar e-mail/i);
    writeOnInput(emailInput, data.email);

    await user.click(sendButton);

    expect(authService.sendEmailRecover).toHaveBeenCalledWith(data.email);
  });

  it('comeback to login page', async () => {
    const user = userEvent.setup();

    const { container } = render(<RecoverPasswordPage />);

    const sendButton: HTMLButtonElement = container.querySelector(
      '.material-symbols-rounded'
    )!;

    await user.click(sendButton);

    expect(navigate).toHaveBeenCalledWith('/login');
  });
});
