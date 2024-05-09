import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input, PasswordInput } from '@components';
import { useAuthContext } from '@contexts/AuthProvider';
import { handleErrorForm } from '@services/api';
import { formCpfPattern } from '@validations/cpf';

import logo from '@assets/logo.svg';

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

  const onSubmit = ((data: { cpf: string; password: string }) => {
    login(data.cpf, data.password).catch(handleErrorForm(setError));
  }) as SubmitHandler<FieldValues>;

  return (
    <div className="row justify-center">
      <div className="col-sm-12 col-md-6">
        <div className="d-flex justify-center">
          <div className="d-flex justify-center background-login-page">
            <form
              autoComplete="off"
              className="form-max-height w-100"
              onSubmit={handleSubmit(onSubmit)}
            >
              <img src={logo} alt="logo" width="100%" />

              <div className="mb-s-350">
                <p className="font-weight-bold line-height-small text-primary">
                  Informe o seu CPF, senha e clique em Entrar
                </p>
              </div>

              <Input
                className="mb-s-200"
                form={register('cpf', {
                  required: 'Obrigatório',
                  ...formCpfPattern,
                })}
                placeholder="Digite o seu CPF"
                error={!!errors.cpf}
                caption={errors.cpf?.message as string}
              />

              <PasswordInput
                className="text-primary"
                form={register('password', { required: 'Obrigatório' })}
                placeholder="Insira sua senha"
                error={!!errors.password}
                caption={errors.password?.message as string}
              />

              <div className="mt-s-200 d-flex justify-end">
                <a
                  href="/recover_password"
                  className="font-s-150 font-weight-regular line-height-medium text-primary text-decoration-underline"
                >
                  Esqueci minha senha
                </a>
              </div>

              <Button
                type="submit"
                isLoading={isLoadingRequest}
                className="!w-100 mt-s-750 mb-s-100"
                alignText="center"
              >
                Entrar
              </Button>

              <div className="mt-s-400 d-flex col justify-center flex-direction-column">
                <p className="font-weight-bold line-height-small text-primary">
                  Não possui uma conta?
                </p>

                <a
                  className="mt-s-200 font-s-150 font-weight-bold line-height-medium text-primary"
                  href="/signup"
                >
                  Cadastrar-se
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
