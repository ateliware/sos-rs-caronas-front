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
  RadioButton,
  RadioForm,
  Select,
} from '@components';
import { useAuthContext } from '@contexts/AuthProvider';
import { Vehicle } from 'interfaces/Vehicles';
import VehiclesAPICaller from '@services/api/vehicles';
import { RideFormParams } from 'interfaces/Rides';
import RidesAPICaller from '@services/api/rides';
import { toast } from 'react-toastify';
import CitiesAPICaller from '@services/api/cities';
import { City } from 'interfaces/Cities';

export default function RideOfferPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
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
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  useEffect(() => {
    VehiclesAPICaller.loadVehicles().then((vehicles) => {
      setVehicles(vehicles);
      if (!vehicles.length) {
        navigate('/vehicle/add');
      }
    });
  }, [navigate]);

  const onSubmit = ((
    data: RideFormParams & {
      origin: { value: number; label: string };
      destination: { value: number; label: string };
    }
  ) => {
    RidesAPICaller.registerRide({
      ...data,
      origin: data.origin.value,
      destination: data.destination.value.toString(),
      vehicle: vehicles[0].uuid,
      status: 'OPEN',
    })
      .then(() => {
        toast.success('Veículo cadastrado com sucesso!');
        navigate('/ride_offer');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar veículo!');
      });
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
              value={watch('origin')}
              options={
                cities.map((city) => ({
                  value: city.id,
                  label: city.label,
                })) as any
              }
              onSelect={(value: string | undefined) => {
                setValue('origin', value);
              }}
              error={!!errors.origin}
              isSearchable={true}
              caption={errors.origin?.message as string}
            />
            <Select
              className="mb-s-200"
              form={register('destination', { required: 'Obrigatório' })}
              label="Destino"
              value={watch('destination')}
              options={
                cities.map((city) => ({
                  value: city.id,
                  label: city.label,
                })) as any
              }
              onSelect={(value: string | undefined) => {
                setValue('destination', value);
              }}
              error={!!errors.destination}
              isSearchable={true}
              caption={errors.destination?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('quantityOfPassengers', {
                required: 'Obrigatório',
              })}
              label="Quantidade de vagas"
              placeholder="Apenas números"
              error={!!errors.quantityOfPassengers}
              caption={errors.quantityOfPassengers?.message as string}
            />
            <Input
              className="mb-s-200"
              form={register('date', { required: 'Obrigatório' })}
              label="Ida"
              type="date"
              error={!!errors.date}
              caption={errors.date?.message as string}
            />
            <InputTextArea
              className="mb-s-200"
              form={register('notes', { required: 'Obrigatório' })}
              label="Notas"
              placeholder="Informações adicionais da viagem"
              error={!!errors.notes}
              caption={errors.notes?.message as string}
            />

            <RadioForm
              name="workShiftFilter"
              form={register('workShift', {
                required: 'Obrigatório',
                value: 'MORNING',
              })}
            >
              <RadioButton label="Manhã" value="MORNING" />
              <RadioButton label="Tarde" value="AFTERNOON" />
              <RadioButton label="Ambos" value="-" />
            </RadioForm>

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
