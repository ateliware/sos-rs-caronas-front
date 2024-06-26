import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Input,
  InputTextArea,
  Item,
  ItemList,
  PageHeader,
  Select,
} from '@components';
import { useAuthContext } from '@contexts/AuthProvider';
import { Vehicle } from 'interfaces/Vehicles';
import VehiclesAPICaller from '@services/api/vehicles';

export default function RideOfferPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (!!user) navigate('/home');
    return;
  }, [user, navigate]);

  useEffect(() => {
    VehiclesAPICaller.loadVehicles().then((vehicles) => {
      setVehicles(vehicles);
      if (!vehicles.length) {
        navigate('/vehicle/add');
      }
    });
  }, [navigate]);

  const onSubmit = ((data: {
    origin: string;
    destination: string;
    meetingPoint: string;
    carSpaces: number;
    departureDate: Date;
    notes: string;
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
              title={`${vehicles[0]?.model} - ${vehicles[0]?.color}`}
              description={`${vehicles[0]?.plate}`}
              icon={'directions_car'}
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
              isSearchable={true}
              caption={errors.origin?.message as string}
            />
            <Select
              className="mb-s-200"
              form={register('destination', { required: 'Obrigatório' })}
              label="Destino"
              value=""
              error={!!errors.destination}
              isSearchable={true}
              caption={errors.destination?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('meetingPoint', { required: 'Obrigatório' })}
              label="Ponto de encontro"
              type="text"
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
              type="date"
              error={!!errors.departureDate}
              caption={errors.departureDate?.message as string}
            />
            <InputTextArea
              className="mb-s-200"
              form={register('notes', { required: 'Obrigatório' })}
              label="Notas"
              placeholder="Informações adicionais da viagem"
              error={!!errors.notes}
              caption={errors.notes?.message as string}
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
    </div>
  );
}
