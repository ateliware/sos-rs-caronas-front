import * as router from 'react-router';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockAPIError, mockAPIFunction, writeOnInput } from '@test/helpers';
import * as authService from '@services/api/auth';
import { AxiosResponse } from 'axios';

import ResetPasswordPage from './ResetPasswordPage';

const navigate = jest.fn();

jest.mock('@services/api/auth/auth', () => ({
  validatePasswordResetToken: jest.fn(),
  sendPasswordReset: jest.fn(),
}));

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(router, 'useParams').mockReturnValue({ token: 'mock token' });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login if token is not valid', async () => {
    mockAPIError(authService.validatePasswordResetToken);

    await waitFor(() => {
      return render(<ResetPasswordPage />);
    });

    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('does not redirect to login if token is valid', async () => {
    mockAPIFunction(authService.validatePasswordResetToken, { status: 200 });

    await waitFor(() => {
      return render(<ResetPasswordPage />);
    });

    expect(navigate).not.toHaveBeenCalled();
  });

  it('sends password correctly', async () => {
    const user = userEvent.setup();

    const password = '!TestPassword25';

    mockAPIFunction(authService.sendPasswordReset, {} as AxiosResponse);

    await waitFor(() => {
      return render(<ResetPasswordPage />);
    });

    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText(/senha/i);
    const sendButton: HTMLButtonElement = screen.getByText(/confirmar/i);
    writeOnInput(passwordInput, password);

    expect(navigate).not.toHaveBeenCalled();

    await user.click(sendButton);

    expect(authService.sendPasswordReset).toHaveBeenCalledWith(
      'mock token',
      password
    );
    expect(navigate).toHaveBeenCalledWith('/login');
  });
});
