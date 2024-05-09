import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Input } from '@components';
import { handleErrorForm } from '@services/api';
import { formEmailPattern } from '@validations/email';
import AuthAPICaller from '@services/api/auth';

import loginImage from '@assets/login.svg';
import logoFinancial from '@assets/blueprint-logo.svg';

export default function RecoverPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = ((data: { email: string }) => {
    setIsLoading(true);
    AuthAPICaller.sendEmailRecover(data.email)
      .then(() => navigate(`/email_sent?email=${data.email}`))
      .catch(handleErrorForm(setError))
      .finally(() => setIsLoading(false));
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
              <img
                className="mb-s-750"
                src={logoFinancial}
                alt="logo"
                width="100%"
              />
              <div className="d-flex mb-s-250">
                <div
                  className="mr-s-100 pointer"
                  title="Voltar"
                  onClick={() => navigate('/login')}
                >
                  <Icon>arrow_back</Icon>
                </div>
                <h2 className="font-s-250 font-weight-semibold line-height-default">
                  Recuperar senha
                </h2>
              </div>
              <div className="!w-100 d-flex">
                <span className="font-s-200 font-weight-light line-height-medium">
                  Preencha o e-mail cadastrado para recuperar sua senha.
                </span>
              </div>

              <Input
                className="mt-s-750 mb-s-200"
                form={register('email', {
                  required: 'Obrigatório',
                  ...formEmailPattern,
                })}
                label="E-mail"
                placeholder="exemplo@exemplo.com"
                error={!!errors.email}
                caption={errors.email?.message as string}
              />

              <Button
                type="submit"
                isLoading={isLoading}
                className="!w-100 mt-s-750 mb-s-100"
                alignText="center"
              >
                Enviar e-mail
              </Button>
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
