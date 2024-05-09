import { SubmitHandler, useForm } from 'react-hook-form';

import { User } from 'interfaces/User';

import { Button, Input, PasswordInput } from '@components';
import { formEmailPattern } from '@validations/email';
import MeAPICaller from '@services/api/me';
import UserAPICaller from '@services/api/user';
import { memo, useCallback, useRef } from 'react';

interface Props {
  closeModal: () => void;
  onSave: () => void;
  editId?: string;
  isMe?: boolean;
}

interface DefaultValue {
  id: string | null;
  name: string;
  active: boolean;
  email: string;
  password?: string;
}

const { createOrUpdate, fetchUser } = UserAPICaller;
const { update, fetchMe } = MeAPICaller;

const fetchDefaultValues = async ({
  isMe,
  editId,
}: Pick<Props, 'editId' | 'isMe'>): Promise<DefaultValue> => {
  if (!editId) {
    return {
      id: null,
      active: true,
      name: '',
      email: '',
      password: '',
    };
  }

  let fetchedUser: User;
  if (isMe) {
    fetchedUser = await fetchMe();
  } else {
    fetchedUser = await fetchUser(editId);
  }

  return {
    id: fetchedUser.id || null,
    active: fetchedUser.active,
    name: fetchedUser.name,
    email: fetchedUser.email,
  };
};

const UserFormBase = ({
  isMe,
  editId,
  closeModal,
  onSave,
  ...props
}: Props) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, defaultValues },
  } = useForm<DefaultValue>({
    defaultValues: async () => fetchDefaultValues({ isMe, editId }),
  });

  const handleOnSubmit = useCallback<SubmitHandler<DefaultValue>>(
    async (data) => {
      const { ...userData } = data;

      if (isMe) {
        return update<typeof userData>(userData, setError).then((res) => {
          if (res.data.errors) return;
          closeModal();
          onSave();
        });
      }

      const createOrUpdateResponse = await createOrUpdate<typeof userData>(
        userData,
        setError
      );

      if (createOrUpdateResponse.data.errors) return;
      if (!defaultValues) {
        return;
      }

      closeModal();
      onSave();
    },
    [closeModal, defaultValues, isMe, onSave, setError]
  );

  const formRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={formRef}>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <form
        role="form"
        autoComplete="off"
        className="form-max-height"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="d-flex flex-direction-column mb-s-200">
          <div className="mb-s-200">
            <Input
              disabled={isLoading}
              label="Nome"
              error={!!errors.name}
              caption={errors.name?.message as string}
              placeholder="Digite o nome do usuário"
              form={register('name', { required: 'Obrigatório' })}
            />
          </div>
          {!isMe && (
            <div className="mb-s-200">
              <Input
                disabled={isLoading}
                label="E-mail"
                error={!!errors.email}
                caption={errors.email?.message as string}
                placeholder="Digite o e-mail do usuário"
                form={register('email', {
                  required: 'Obrigatório',
                  ...formEmailPattern,
                })}
              />
            </div>
          )}
          {!editId && (
            <div className="mb-s-200">
              <PasswordInput
                label="Senha"
                error={!!errors.password}
                caption={errors.password?.message as string}
                placeholder="Digite a senha do usuário"
                form={register('password', { required: 'Obrigatório' })}
              />
            </div>
          )}
          <div className="d-flex justify-end">
            <Button
              disabled={isLoading}
              isLoading={isSubmitting || isLoading}
              className="pl-s-900 pr-s-900"
              type="submit"
            >
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const UserForm = memo(UserFormBase);

export default UserForm;
