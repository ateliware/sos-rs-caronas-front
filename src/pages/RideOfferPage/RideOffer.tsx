import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Item, ItemList, PageHeader, Select } from '@components';
import { useAuthContext } from '@contexts/AuthProvider';

export default function RideOfferPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, isLoadingRequest } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) navigate('/home');
    return;
  }, [user, navigate]);

  const onSubmit = ((data: {
    origin: string;
    destination: string;
    meetingPoint: string;
    carSpaces: number;
    departureDate: Date;
    returnDate: string;
  }) => {
    console.log('form submit');
  }) as SubmitHandler<FieldValues>;

  return (
    <div className="">
      <PageHeader title="Ofertar carona" backButton={true}></PageHeader>
      <ItemList
        items={[
          <>
            <Item
              key="volunteer"
              title={'Modelo Veículo'}
              description={'Marca / Placa'}
              icon={'directions_car'}
              route={'/volunteer'}
            />
          </>,
        ]}
      />
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
            <Select
              className="mb-s-200"
              form={register('origin', { required: 'Obrigatório' })}
              label="Origem"
              value=""
              error={!!errors.origin}
              caption={errors.origin?.message as string}
            />
            <Select
              className="mb-s-200"
              form={register('destination', { required: 'Obrigatório' })}
              label="Destino"
              value=""
              error={!!errors.destination}
              caption={errors.destination?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('meetingPoint', { required: 'Obrigatório' })}
              label="Ponto de encontro"
              type="date"
              error={!!errors.meetingPoint}
              caption={errors.meetingPoint?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('meetingPoint', { required: 'Obrigatório' })}
              label="Ponto de encontro"
              type="date"
              error={!!errors.meetingPoint}
              caption={errors.meetingPoint?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('carSpaces', {
                required: 'Obrigatório',
              })}
              label="Quantidade de vagas"
              placeholder="Apenas números"
              error={!!errors.carSpaces}
              caption={errors.carSpaces?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('departureDate', { required: 'Obrigatório' })}
              label="Ida"
              type="datetime-local"
              error={!!errors.departureDate}
              caption={errors.departureDate?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('returnDate', { required: 'Obrigatório' })}
              label="Volta"
              type="datetime-local"
              error={!!errors.returnDate}
              caption={errors.returnDate?.message as string}
            />
            <Button
              type="submit"
              isLoading={isLoadingRequest}
              className="!w-100 mb-s-100"
              alignText="center"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
