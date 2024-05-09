import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as AuthContext from '@contexts/AuthProvider';
import { ApiResponse } from '@services/api';
import { writeOnInput } from '@test/helpers';

import LoginPage from './LoginPage';

const contextValues: AuthContext.TAuthContext = {
  user: null,
  token: null,
  setUser: jest.fn(),
  loading: false,
  login: jest.fn().mockResolvedValue({} as ApiResponse),
  recover: jest.fn().mockResolvedValue({} as ApiResponse),
  logout: jest.fn().mockResolvedValue({} as ApiResponse),
};

const contextSpy = jest.spyOn(AuthContext, 'useAuthContext');

describe('LoginPage', () => {
  beforeEach(() => {
    contextSpy.mockImplementation(() => contextValues);
  });
  it('renders', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  });

  it('logs in correctly', async () => {
    const user = userEvent.setup();
    const userCredentials = {
      email: 'user@mail.com',
      password: '!Password#0',
    };

    const loginSpy = jest.spyOn(contextValues, 'login');
    loginSpy.mockResolvedValue({} as ApiResponse);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    const emailInput: HTMLInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText(/Insira sua senha/i);
    const loginButton: HTMLButtonElement = screen.getByText(/Entrar/i);
    writeOnInput(emailInput, userCredentials.email);
    writeOnInput(passwordInput, userCredentials.password);

    await user.click(loginButton);

    expect(contextValues.login).toHaveBeenCalledWith(
      userCredentials.email,
      userCredentials.password
    );
  });

  it('show form errors when api responds with error', async () => {
    const user = userEvent.setup();
    const userCredentials = {
      email: 'user@mail.com',
      password: '!Password#0',
    };

    const loginSpy = jest.spyOn(contextValues, 'login');
    loginSpy.mockRejectedValue({
      response: {
        data: {
          errors: {
            email: ['E-mail inválido'],
            password: ['is too weak'],
          },
        },
      },
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    const emailInput: HTMLInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText(/Insira sua senha/i);
    const loginButton: HTMLButtonElement = screen.getByText(/Entrar/i);
    writeOnInput(emailInput, userCredentials.email);
    writeOnInput(passwordInput, userCredentials.password);

    await user.click(loginButton);

    expect(contextValues.login).toHaveBeenCalledWith(
      userCredentials.email,
      userCredentials.password
    );

    expect(screen.getByText(/E-mail inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/is too weak/i)).toBeInTheDocument();
  });
});
