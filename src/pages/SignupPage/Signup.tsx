import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FileUpload,
  Input,
  PageHeader,
  PasswordInput,
  Select,
} from '@components';

import { City } from 'interfaces/Cities';
import { useAuthContext } from '@contexts/AuthProvider';
import { handleErrorForm } from '@services/api';
import { RemotePerson } from 'interfaces/Person';
import PersonAPICaller from '@services/api/person';

import CitiesAPICaller from '@services/api/cities';

export default function SignupPage() {
  const {
    setError,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (!!user) navigate('/home');
    return;
  }, [user, navigate]);

  useEffect(() => {
    CitiesAPICaller.loadCities()
      .then((data) => {
        setCities(data);
      })
      .catch(() => {
        handleErrorForm(setError);
      });
  }, [setError]);

  const onSubmit = ((data: {
    cpf: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phoneNumber: string;
    emergencyPhone: string;
    emergencyContact: string;
    birthDate: string;
    avatar: string;
    city: { value: number; label: string };
    lgpdAcceptance: boolean;
  }) => {
    try {
      const remotePersonData: RemotePerson = {
        cpf: data.cpf,
        password: data.password,
        password_confirm: data.passwordConfirm,
        name: data.name,
        phone: data.phoneNumber,
        emergency_phone: data.emergencyPhone,
        emergency_contact: data.emergencyContact,
        birth_date: data.birthDate,
        avatar: data.avatar,
        city_id: data.city.value,
        lgpd_acceptance: data.lgpdAcceptance,
      };
      console.log(remotePersonData);

      PersonAPICaller.register(remotePersonData)
        .then((data) => console.log(data))
        .catch(() => {
          handleErrorForm(setError);
        });
    } catch (error) {
      handleErrorForm(setError);
    }
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
              form={register('name', { required: 'Obrigatório' })}
              label="Nome Completo"
              placeholder="Nome completo"
              error={!!errors.name}
              caption={errors.name?.message as string}
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
              form={register('emergencyContact', {
                required: 'Obrigatório',
              })}
              label="Nome do contato emergencial"
              error={!!errors.emergencyContact}
              caption={errors.emergencyContact?.message as string}
            />
            <Input
              className="mb-s-100"
              form={register('emergencyPhone', {
                required: 'Obrigatório',
                pattern: {
                  value: /^\d{10,11}$/,
                  message: 'Número de telefone inválido',
                },
              })}
              label="Telefone contato emergencial"
              placeholder="Apenas números"
              error={!!errors.emergencyPhone}
              caption={errors.emergencyPhone?.message as string}
            />
            <Select
              className="mb-s-100"
              form={register('city', { required: 'Obrigatório' })}
              label="Cidade"
              placeholder="Selecione a cidade"
              value={watch('city')}
              error={!!errors.city}
              options={
                cities.map((city) => ({
                  value: city.id,
                  label: city.label,
                })) as any
              }
              onSelect={(value: string | undefined) => {
                setValue('city', value);
              }}
              caption={errors.city?.message as string}
            />
            <PasswordInput
              className="mb-s-100"
              form={register('password', {
                required: 'Obrigatório',
              })}
              label="Senha"
              error={!!errors.password}
              caption={errors.password?.message as string}
            />
            <PasswordInput
              className="mb-s-100"
              form={register('passwordConfirm', {
                required: 'Obrigatório',
              })}
              label="Confirmação Senha"
              error={!!errors.passwordConfirm}
              caption={errors.passwordConfirm?.message as string}
            />
            <Checkbox
              form={register('lgpdAcceptance', {
                required: 'Obrigatório',
              })}
              label="Aceito os termos de uso"
            />

            <hr className="mt-s-400 w-100 bg-neutral-60" />

            <div className="d-flex justify-between mt-s-400">
              <div className="col-sm-5">
                <Button
                  type="button"
                  className="!w-100 mb-s-100"
                  alignText="center"
                  size="small"
                  design="transparent"
                  onClick={() => navigate('/home')}
                >
                  Cancelar
                </Button>
              </div>

              <div className="col-sm-5">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="!w-100 mb-s-100"
                  alignText="center"
                  size="small"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
