import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';

import { Button } from '@components';
import { User } from 'interfaces/User';
import * as auth from '@services/api/auth';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosResponse } from 'axios';
import { mockAPIFunction } from '@test/helpers';

import { AuthProvider, useAuthContext } from './AuthProvider';

jest.mock('@services/api/auth/auth', () => ({
  login: jest.fn(),
  setAuthorization: jest.fn(),
}));

const mockUser: User = {
  id: 'mock id',
  email: 'john@mail.com',
  name: 'John',
  active: true,
};
const mockToken = 'valid token';

beforeAll(() => {
  jest.restoreAllMocks();
});

afterAll(() => {
  jest.spyOn(router, 'useNavigate').mockReturnValue(() => jest.fn());
});

describe('AuthProvider rendering', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('renders with children and loads data from local storage correctly', () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, 'getItem');
    localStorageSpy.mockImplementation((key: string) => {
      const mockLocalStorage: { [key: string]: string } = {
        user: JSON.stringify(mockUser),
        token: mockToken,
      };

      return mockLocalStorage[key];
    });
    const setAuthorizationSpy = jest.spyOn(auth, 'setAuthorization');

    const AuthStub = () => {
      const { user, loading } = useAuthContext();
      return <>{!loading && <label data-testid="user">{user?.name}</label>}</>;
    };

    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthStub />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(localStorageSpy).toHaveBeenCalledWith('user');
    expect(localStorageSpy).toHaveBeenCalledWith('token');

    expect(setAuthorizationSpy).toHaveBeenCalledWith(mockToken);

    const user = screen.getByTestId('user');

    expect(user).toHaveTextContent(mockUser.name);
  });

  it('renders with children and fails to load data', () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, 'getItem');
    localStorageSpy.mockImplementation((key: string) => {
      const mockLocalStorage: { [key: string]: null } = {
        user: null,
        token: null,
      };

      return mockLocalStorage[key];
    });
    const setAuthorizationSpy = jest.spyOn(auth, 'setAuthorization');

    const AuthStub = () => {
      const { user, loading } = useAuthContext();
      return <>{!loading && <label data-testid="user">{user?.name}</label>}</>;
    };

    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthStub />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(localStorageSpy).toHaveBeenCalledWith('user');
    expect(localStorageSpy).toHaveBeenCalledWith('token');

    expect(setAuthorizationSpy).not.toHaveBeenCalled();

    const user = screen.getByTestId('user');

    expect(user).toHaveTextContent('');
  });
});

describe('handleLogin', () => {
  it('Test if setUser change user data', async () => {
    const user = userEvent.setup();
    const response: Partial<AxiosResponse> = {
      data: { token: mockToken, user: mockUser },
    };
    mockAPIFunction(auth.login, response);

    const LoginStub = () => {
      const { user, setUser } = useAuthContext();
      return (
        <>
          <Button onClick={() => setUser(mockUser)}>setUser</Button>
          <label data-testid="logged-in">{user?.email}</label>
        </>
      );
    };

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginStub />
        </AuthProvider>
      </MemoryRouter>
    );

    const setUserButton = screen.getByText(/setUser/i);
    const loggedInLabel = screen.getByTestId('logged-in');

    expect(loggedInLabel).toHaveTextContent('');

    await user.click(setUserButton);

    expect(loggedInLabel).toHaveTextContent(mockUser.email);
  });

  it('logs in properly when api responds with user data', async () => {
    const user = userEvent.setup();
    const response: Partial<AxiosResponse> = {
      data: { token: mockToken, user: mockUser },
    };
    mockAPIFunction(auth.login, response);

    const LoginStub = () => {
      const { user, loading, login } = useAuthContext();
      const mockEmail = mockUser.email;
      const mockPassword = 'Password1';
      return (
        <>
          <Button onClick={() => login(mockEmail, mockPassword)}>Login</Button>
          <>{!loading && <label data-testid="logged-in">{user?.name}</label>}</>
        </>
      );
    };

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginStub />
        </AuthProvider>
      </MemoryRouter>
    );

    const loggedInLabel = screen.getByTestId('logged-in');
    const loginButton = screen.getByText(/login/i);

    expect(loggedInLabel).toHaveTextContent('');

    await user.click(loginButton);

    expect(loggedInLabel).toHaveTextContent(mockUser.name);
  });

  it('fails when api responds with error', async () => {
    const user = userEvent.setup();
    const response: Partial<AxiosResponse> = {
      data: { errors: ['Invalid credentials'] },
    };
    mockAPIFunction(auth.login, response);

    const LoginStub = () => {
      const { user, loading, login } = useAuthContext();
      const mockEmail = mockUser.email;
      const mockPassword = 'Password1';
      return (
        <>
          <Button onClick={() => login(mockEmail, mockPassword)}>Login</Button>
          <>{!loading && <label data-testid="logged-in">{user?.name}</label>}</>
        </>
      );
    };

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginStub />
        </AuthProvider>
      </MemoryRouter>
    );

    const loggedInLabel = screen.getByTestId('logged-in');
    const loginButton = screen.getByText(/login/i);

    expect(loggedInLabel).toHaveTextContent('');

    await user.click(loginButton);

    expect(loggedInLabel).toHaveTextContent('');
  });
});

describe('handleLogout', () => {
  it('logs out correctly', async () => {
    const user = userEvent.setup();

    const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    localStorageGetItemSpy.mockImplementation((key: string) => {
      const mockLocalStorage: { [key: string]: string } = {
        user: JSON.stringify(mockUser),
        token: mockToken,
      };

      return mockLocalStorage[key];
    });

    const localStorageRemoveItemSpy = jest.spyOn(
      Storage.prototype,
      'removeItem'
    );

    const setAuthorizationSpy = jest.spyOn(auth, 'setAuthorization');

    const LogoutStub = () => {
      const { user, loading, logout } = useAuthContext();
      return (
        <>
          <Button onClick={() => logout()}>Logout</Button>
          <>{!loading && <label data-testid="logged-in">{user?.name}</label>}</>
        </>
      );
    };

    render(
      <MemoryRouter>
        <AuthProvider>
          <LogoutStub />
        </AuthProvider>
      </MemoryRouter>
    );

    const loggedInLabel = screen.getByTestId('logged-in');
    const logoutButton = screen.getByText(/logout/i);

    expect(loggedInLabel).toHaveTextContent(mockUser.name);

    await waitFor(async () => {
      await user.click(logoutButton);
      return expect(loggedInLabel).toBeEmptyDOMElement();
    });

    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('user');
    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('token');

    expect(setAuthorizationSpy).toHaveBeenCalledWith(null);
  });
});
