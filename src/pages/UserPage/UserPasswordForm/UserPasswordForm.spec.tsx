import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as userService from '@services/api/user';
import * as meService from '@services/api/me';
import { mockAPIFunction, writeOnInput } from '@test/helpers';

import UserPasswordForm from './UserPasswordForm';

jest.mock('@services/api/user/calls', () => ({
  updatePassword: jest.fn(),
}));

jest.mock('@services/api/me/calls', () => ({
  updatePassword: jest.fn(),
}));

describe('UserPasswordForm', () => {
  beforeEach(() => {
    mockAPIFunction(userService.updatePassword);
    mockAPIFunction(meService.updatePassword);
  });

  it('Renders modal', async () => {
    render(<UserPasswordForm closeModal={() => {}} />);

    const saveButton = screen.getByText(/Salvar/i);
    expect(saveButton).toBeInTheDocument();
  });

  it('submits form', async () => {
    const { container } = render(
      <UserPasswordForm editId="editingUserId" closeModal={() => {}} />
    );
    const form = container.querySelector('form')!;
    const passwordInput = screen.getByLabelText('Senha');
    const passwordConfirmationInput = screen.getByLabelText('Confirmar senha');

    writeOnInput(passwordInput, 'Password1');
    writeOnInput(passwordConfirmationInput, 'Password1');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(userService.updatePassword).toHaveBeenCalledWith('editingUserId', {
        password: 'Password1',
      });
    });
  });

  it('validate form', async () => {
    const { container } = render(<UserPasswordForm closeModal={() => {}} />);
    const form = container.querySelector('form')!;
    const passwordInput = screen.getByLabelText('Senha');
    const passwordConfirmationInput = screen.getByLabelText('Confirmar senha');

    writeOnInput(passwordInput, 'Password1');
    writeOnInput(passwordConfirmationInput, 'Password2');

    fireEvent.submit(form);

    expect(
      await screen.findByText('As senhas não coincidem')
    ).toBeInTheDocument();
  });
});
