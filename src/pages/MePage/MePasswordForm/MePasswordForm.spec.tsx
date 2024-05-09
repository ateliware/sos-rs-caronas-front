import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as meService from '@services/api/me';
import { mockAPIFunction, writeOnInput } from '@test/helpers';

import MePasswordForm from './MePasswordForm';

jest.mock('@services/api/me/calls', () => ({
  updatePassword: jest.fn(),
}));

describe('MePasswordForm', () => {
  beforeEach(() => {
    mockAPIFunction(meService.updatePassword);
  });

  it('Renders modal', async () => {
    render(<MePasswordForm closeModal={() => {}} />);

    const saveButton = screen.getByText('Salvar');
    expect(saveButton).toBeInTheDocument();
  });

  it('submits form', async () => {
    const { container } = render(<MePasswordForm closeModal={() => {}} />);
    const form = container.querySelector('form')!;
    const oldPasswordInput = screen.getByLabelText('Senha antiga');
    const passwordInput = screen.getByLabelText('Senha');
    const passwordConfirmationInput = screen.getByLabelText('Confirmar senha');

    writeOnInput(oldPasswordInput, 'OldPassword');
    writeOnInput(passwordInput, 'Password1');
    writeOnInput(passwordConfirmationInput, 'Password1');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(meService.updatePassword).toHaveBeenCalledWith({
        oldPassword: 'OldPassword',
        password: 'Password1',
      });
    });
  });

  it('Validate Form', async () => {
    const { container } = render(<MePasswordForm closeModal={() => {}} />);
    const form = container.querySelector('form')!;
    const oldPasswordInput = screen.getByLabelText('Senha antiga');
    const passwordInput = screen.getByLabelText('Senha');
    const passwordConfirmationInput = screen.getByLabelText('Confirmar senha');

    writeOnInput(oldPasswordInput, 'OldPassword');
    writeOnInput(passwordInput, 'Password1');

    writeOnInput(passwordConfirmationInput, 'Password2');

    fireEvent.submit(form);

    expect(
      await screen.findByText('As senhas não coincidem')
    ).toBeInTheDocument();
  });
});
