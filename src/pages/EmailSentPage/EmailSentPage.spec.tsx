import * as router from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as authService from '@services/api/auth';
import { AxiosResponse } from 'axios';
import { act } from 'react-dom/test-utils';
import { mockAPIFunction } from '@test/helpers';

import EmailSent from './EmailSentPage';

jest.useFakeTimers();

const navigate = jest.fn();

jest.mock('@services/api/auth/auth', () => ({
  sendEmailRecover: jest.fn(),
}));

describe('EmailSentPage', () => {
  beforeEach(() => {
    mockAPIFunction(authService.sendEmailRecover, {} as AxiosResponse);
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<EmailSent />} />
      </Routes>
    </BrowserRouter>;
  });

  it('resends email correctly', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EmailSent />} />
        </Routes>
      </BrowserRouter>
    );

    const sendButton: HTMLButtonElement = screen.getByText(/Reenviar/i);

    await user.click(sendButton);

    act(() => {
      jest.runAllTimers();
    });

    expect(authService.sendEmailRecover).toHaveBeenCalled();
  });

  it('blocks the resend button until setTimeout ends', async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EmailSent />} />
        </Routes>
      </BrowserRouter>
    );

    const sendButton: HTMLButtonElement = screen.getByText(/Reenviar/i);

    await user.click(sendButton);

    expect(authService.sendEmailRecover).toHaveBeenCalledTimes(1);

    await user.click(sendButton);

    expect(authService.sendEmailRecover).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runAllTimers();
    });

    await user.click(sendButton);

    expect(authService.sendEmailRecover).toHaveBeenCalledTimes(2);
  });

  it('comeback to login page', async () => {
    const user = userEvent.setup({ delay: null });

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EmailSent />} />
        </Routes>
      </BrowserRouter>
    );

    const backButton: HTMLButtonElement = container.querySelector(
      '.material-symbols-rounded'
    )!;

    await user.click(backButton);

    expect(navigate).toHaveBeenCalledWith('/login');
  });
});
