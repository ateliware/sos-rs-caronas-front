import { useForm } from 'react-hook-form';

import { Button, PasswordInput } from '@components';
import UserAPICaller from '@services/api/user';

interface Props {
  closeModal: () => void;
  editId?: string;
}

export default function UserPasswordForm(props: Props) {
  const { setUserPassword } = UserAPICaller;

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form
      autoComplete="off"
      className="form-max-height"
      onSubmit={handleSubmit((data) => {
        if (data.password !== data.passwordConfirm) {
          setError('passwordConfirm', {
            type: 'manual',
            message: 'As senhas não coincidem',
          });
          return;
        }

        return setUserPassword(props.editId!, data.password, setError).then(
          (res) => {
            if (res.data.errors) return;
            props.closeModal();
          }
        );
      })}
    >
      <div className="d-flex flex-direction-column mb-s-200">
        <div className="mb-s-200">
          <PasswordInput
            form={register('password', { required: 'Obrigatório' })}
            label="Senha"
            error={!!errors.password}
            caption={errors.password?.message as string}
          />
        </div>
        <div className="mb-s-200">
          <PasswordInput
            form={register('passwordConfirm', { required: 'Obrigatório' })}
            label="Confirmar senha"
            error={!!errors.passwordConfirm}
            caption={errors.passwordConfirm?.message as string}
          />
        </div>

        <div className="row justify-end">
          <Button
            className="pl-s-900 pr-s-900"
            isLoading={isSubmitting}
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
