import { render, waitFor } from '@testing-library/react';
import * as userService from '@services/api/user';
import { mockAPIFunction, renderStub } from '@test/helpers';

import UserPage from './UserPage';

jest.mock('@services/api/user/calls', () => ({
  list: jest.fn(),
}));

const response = {
  data: {
    users: {
      total: 0,
      result: [],
    },
  },
};

describe('UserPage', () => {
  beforeEach(() => mockAPIFunction(userService.list, response));

  it('renders', async () => {
    await waitFor(() => {
      return render(renderStub(<UserPage />));
    });
  });

  it('renders user table', async () => {
    const { container } = await waitFor(() => {
      return render(renderStub(<UserPage />));
    });

    const userTable = container.querySelector('table');

    expect(userTable).toBeInTheDocument();
    expect(userTable).toHaveClass('table');
    expect(userTable).toHaveTextContent('Usuário');
    expect(userTable).toHaveTextContent('E-mail');
    expect(userTable).toHaveTextContent('Status');
    expect(userTable).toHaveTextContent('Admin');
    expect(userTable).toHaveTextContent('Senha');
    expect(userTable).toHaveTextContent('Editar');
  });
});
