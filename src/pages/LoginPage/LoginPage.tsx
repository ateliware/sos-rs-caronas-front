import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input, PasswordInput } from '@components';
import { useAuthContext } from '@contexts/AuthProvider';
import { handleErrorForm } from '@services/api';
import { formEmailPattern } from '@validations/email';

import loginImage from '@assets/login.svg';
import logo from '@assets/blueprint-logo.svg';

export default function LoginPage() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, user, isLoadingRequest } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) navigate('/home');
    return;
  }, [user, navigate]);

  const onSubmit = ((data: { email: string; password: string }) => {
    login(data.email.toLowerCase(), data.password).catch(
      handleErrorForm(setError)
    );
  }) as SubmitHandler<FieldValues>;

  return (
    <div className="bg-neutral-95 row">
      <div className="col-sm-5">
        <div className="d-flex justify-center" style={{ height: '100vh' }}>
          <div className="d-flex justify-center background-login-page w-75">
            <form
              autoComplete="off"
              className="form-max-height w-100"
              onSubmit={handleSubmit(onSubmit)}
            >
              <img className="mb-s-750" src={logo} alt="logo" width="100%" />
              <Input
                className="mb-s-200"
                form={register('email', {
                  required: 'Obrigatório',
                  ...formEmailPattern,
                })}
                label="E-mail"
                placeholder="exemplo@exemplo.com"
                error={!!errors.email}
                caption={errors.email?.message as string}
              />
              <PasswordInput
                className="text-primary"
                form={register('password', { required: 'Obrigatório' })}
                label="Senha"
                placeholder="Insira sua senha"
                error={!!errors.password}
                caption={errors.password?.message as string}
              />

              <Button
                type="submit"
                isLoading={isLoadingRequest}
                className="!w-100 mt-s-750 mb-s-100"
                alignText="center"
              >
                Entrar
              </Button>
              <div className="d-flex justify-end">
                <a
                  href="/recover_password"
                  className="font-s-150 font-weight-regular line-height-medium text-primary text-decoration-underline"
                >
                  Recuperar senha
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-sm-8">
        <div className="d-flex justify-center align-items-center h-100 w-100">
          <img src={loginImage} alt="login" width="100%" height="auto" />
        </div>
      </div>
    </div>
  );
}
