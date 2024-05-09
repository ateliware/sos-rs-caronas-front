import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthProvider';
import * as meService from '@services/api/me';
import * as userService from '@services/api/user';
import { mockAPIFunction } from '@test/helpers';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MePage from './MePage';

jest.mock('@services/api/me/calls', () => ({
  retrieve: jest.fn(),
}));

jest.mock('@services/api/user/calls', () => ({
  retrieve: jest.fn(),
}));

const response = {
  data: {
    user: {
      id: '123',
      name: 'Admin User',
      email: 'test@mail.com',
      admin: true,
      active: true,
      imageUrl: null,
      accessGroupId: null,
      accessGroup: null,
    },
  },
};

describe('MePage', () => {
  beforeEach(() => {
    mockAPIFunction(meService.retrieve, response);
    mockAPIFunction(userService.retrieve, response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders', async () => {
    await waitFor(() => {
      return render(
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<MePage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
    });
  });

  it('Verify if fill data correctly', async () => {
    const { container } = await waitFor(() => {
      return render(
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<MePage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    const titleName = container.querySelectorAll(
      'div.col-md-8 > div > div:nth-child(1) > span'
    )[0];
    expect(titleName).toBeInTheDocument();
    expect(titleName).toHaveTextContent(response.data.user.name);

    const email = container.querySelectorAll(
      'div.col-md-8 > div > div:nth-child(4) > span'
    )[0];
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent(response.data.user.email);
  });

  it('Verify open changePassword modal', async () => {
    const user = userEvent.setup();
    await waitFor(() => {
      return render(
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<MePage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    const changePasswordButton: HTMLButtonElement =
      screen.getByText(/Alterar senha/i);
    expect(changePasswordButton).toBeInTheDocument();

    await user.click(changePasswordButton);

    const inputOldPassword = screen.getByLabelText(/Senha antiga/i);
    const inputCheckPassword = screen.getByLabelText(/Confirmar senha/i);
    expect(inputOldPassword).toBeInTheDocument();
    expect(inputCheckPassword).toBeInTheDocument();
  });

  it('Verify open update modal', async () => {
    const user = userEvent.setup();
    await waitFor(() => {
      return render(
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<MePage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    const updateUserButton: HTMLButtonElement = screen.getByText(/Editar/i);
    expect(updateUserButton).toBeInTheDocument();

    await user.click(updateUserButton);

    const title = screen.getByText(/Editar usuário/i);
    expect(title).toBeInTheDocument();
  });

  it('Opens modal on mount when searchParams is set', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('true');

    await waitFor(() => {
      return render(
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<MePage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    const changePasswordButton: HTMLButtonElement = screen.getByText(/Salvar/i);
    expect(changePasswordButton).toBeInTheDocument();
  });

  it('Does not open modal on mount when searchParams is not set', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('false');

    await waitFor(() => {
      return render(
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<MePage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    const changePasswordButton: HTMLButtonElement | null =
      screen.queryByText(/Salvar/i);
    expect(changePasswordButton).not.toBeInTheDocument();
  });
});
