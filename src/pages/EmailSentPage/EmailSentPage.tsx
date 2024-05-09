import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Icon } from '@components';
import AuthAPICaller from '@services/api/auth';

import loginImage from '@assets/login.svg';
import logoFinancial from '@assets/blueprint-logo.svg';

export default function EmailSentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [email] = useState(searchParams.get('email') || '');

  const handleRecover = async (email: string) => {
    setIsLoading(true);
    await AuthAPICaller.sendEmailRecover(email);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="bg-neutral-95 row">
      <div className="col-sm-5">
        <div className="d-flex justify-center" style={{ height: '100vh' }}>
          <div className="d-flex flex-direction-column background-login-page w-75">
            <img
              className="mb-s-750"
              src={logoFinancial}
              alt="logo"
              width="100%"
            />
            <div className="d-flex mb-s-250 !w-100">
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
            <div className="!w-100 d-flex flex-direction-column align-items-flex-start">
              <span className="font-s-200 font-weight-light line-height-medium">
                E-mail enviado com sucesso!
              </span>
              <span className="font-s-200 font-weight-light line-height-medium">
                Enviamos um link de recuperação para o e-mail abaixo
              </span>
            </div>
            <span className="!w100 d-flex justify-center p-s-300 font-s-200 text-center">
              {email}
            </span>
            <span className="!w100 font-weight-bold mt-s-750">
              Não recebeu o e-mail?
            </span>
            <Button
              isLoading={isLoading}
              className="!w-100 !mt-s-100"
              alignText="center"
              onClick={async () => await handleRecover(email)}
            >
              Reenviar link
            </Button>
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
