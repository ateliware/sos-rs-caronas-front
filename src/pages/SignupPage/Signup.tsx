import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, FileUpload, Input, PageHeader, Select } from '@components';
import { useAuthContext } from '@contexts/AuthProvider';
import { handleErrorForm } from '@services/api';

export default function SignupPage() {
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

  const onSubmit = ((data: {
    password: string;
    fullName: string;
    birthDate: string;
    cpf: string;
    phoneNumber: string;
    state: string;
    city: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  }) => {
    login(data.cpf.toLowerCase(), data.password).catch(
      handleErrorForm(setError)
    );
  }) as SubmitHandler<FieldValues>;

  return (
    <>
      <div className="p-s-100">
        <PageHeader title="Cadastro" backButton={true}></PageHeader>
      </div>

      <div
        className="d-flex justify-center p-s-300"
        style={{ height: '100vh' }}
      >
        <div className="d-flex justify-center w-75">
          <form
            autoComplete="off"
            className="form-max-height w-100"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FileUpload label="Foto do Perfil" uploadPreview={true} />
            <Input
              className="mb-s-100 mt-s-200"
              form={register('fullName', { required: 'Obrigatório' })}
              label="Nome Completo"
              placeholder="Nome completo"
              error={!!errors.fullName}
              caption={errors.fullName?.message as string}
            />
            <Input
              className="mb-s-100"
              form={register('birthDate', { required: 'Obrigatório' })}
              label="Data de Nascimento"
              type="date"
              error={!!errors.birthDate}
              caption={errors.birthDate?.message as string}
            />
            <Input
              className="mb-s-100"
              form={register('cpf', {
                required: 'Obrigatório',
                pattern: {
                  value: /^\d{11}$/,
                  message: 'CPF inválido',
                },
              })}
              label="CPF"
              placeholder="Apenas números"
              error={!!errors.cpf}
              caption={errors.cpf?.message as string}
            />
            <Input
              className="mb-s-100"
              form={register('phoneNumber', {
                required: 'Obrigatório',
                pattern: {
                  value: /^\d{10,11}$/,
                  message: 'Número de telefone inválido',
                },
              })}
              label="Número de Telefone"
              placeholder="Apenas números"
              error={!!errors.phoneNumber}
              caption={errors.phoneNumber?.message as string}
            />
            <Input
              className="mb-s-100"
              form={register('emergencyContactName', {
                required: 'Obrigatório',
              })}
              label="Nome do contato emergencial"
              error={!!errors.emergencyContactName}
              caption={errors.emergencyContactName?.message as string}
            />
            <Input
              className="mb-s-100"
              form={register('emergencyContactNumber', {
                required: 'Obrigatório',
                pattern: {
                  value: /^\d{10,11}$/,
                  message: 'Número de telefone inválido',
                },
              })}
              label="Telefone contato emergencial"
              placeholder="Apenas números"
              error={!!errors.emergencyContactNumber}
              caption={errors.emergencyContactNumber?.message as string}
            />
            <Select
              className="mb-s-100"
              form={register('state', { required: 'Obrigatório' })}
              label="Estado"
              value=""
              error={!!errors.state}
              caption={errors.state?.message as string}
            />
            <Select
              className="mb-s-100"
              form={register('city', { required: 'Obrigatório' })}
              label="Cidade"
              value=""
              error={!!errors.city}
              caption={errors.city?.message as string}
            />
            <Button
              type="submit"
              isLoading={isLoadingRequest}
              className="!w-100 mt-s-200"
              alignText="center"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
