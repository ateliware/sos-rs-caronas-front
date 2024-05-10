import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, FileUpload, Input, PageHeader } from '@components';
import { VehicleFormParams } from 'interfaces/Vehicles';
import VehiclesAPICaller from '@services/api/vehicles';

export default function VehicleFormPage() {
  const [platePicture, setPlatePicture] = useState<File>();
  const [vehiclePicture, setvehiclePicture] = useState<File>();
  const [cnhPicture, setCnhPicture] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    VehiclesAPICaller.loadVehicles().then((vehicles) => {
      if (vehicles.length) {
        navigate('/ride_offer');
      }
    });
  }, [navigate]);

  const onSubmit = async (data: VehicleFormParams) => {
    if (!platePicture || !vehiclePicture || !cnhPicture) {
      toast.error('Por favor, anexe as fotos necessárias!');
      return;
    }

    VehiclesAPICaller.registerVehicle({
      ...data,
      platePicture,
      vehiclePicture,
      cnhPicture,
      isVerified: false,
    })
      .then(() => {
        toast.success('Veículo cadastrado com sucesso!');
        navigate('/ride_offer');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar veículo!');
      });
  };

  return (
    <>
      <div className="p-s-100">
        <PageHeader title="Cadastrar Veículo" backButton={true}></PageHeader>
      </div>

      <div className="d-flex justify-center" style={{ height: '100vh' }}>
        <div className="d-flex justify-center w-75">
          <form
            autoComplete="off"
            className="form-max-height w-100 p-s-100"
            onSubmit={handleSubmit((data) => {
              onSubmit(data as VehicleFormParams);
            })}
          >
            <Input
              className="mb-s-200 mt-s-200"
              form={register('cnh', {
                required: 'Obrigatório',
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: 'CNH inválida',
                },
              })}
              label="CNH"
              placeholder="CNH - Apenas números"
              error={!!errors.cnh}
              caption={errors.cnh?.message as string}
              mask="onlyNumbers"
            />

            <Input
              className="mb-s-200 mt-s-200"
              form={register('plate', {
                required: 'Obrigatório',
              })}
              label="Placa do veículo"
              placeholder="Placa do veículo"
              error={!!errors.plate}
              caption={errors.plate?.message as string}
            />

            <Input
              className="mb-s-200 mt-s-200"
              form={register('model', { required: 'Obrigatório' })}
              label="Modelo do carro"
              placeholder="Modelo do carro"
              error={!!errors.model}
              caption={errors.model?.message as string}
            />

            <Input
              className="mb-s-200 mt-s-200"
              form={register('color', { required: 'Obrigatório' })}
              label="Cor do carro"
              placeholder="Cor do carro"
              error={!!errors.color}
              caption={errors.color?.message as string}
            />

            <FileUpload
              label="Anexar foto da Placa do Veículo"
              uploadPreview={true}
              accept="image/*"
              multiple={false}
              maxSizeInBytes={2097152}
              onChange={([file]) => {
                if (file) {
                  setPlatePicture(file);
                }
              }}
            />

            <div className="mb-s-200 mt-s-200">
              <FileUpload
                label="Anexar foto do Veículo"
                uploadPreview={true}
                accept="image/*"
                multiple={false}
                maxSizeInBytes={2097152}
                onChange={([file]) => {
                  if (file) {
                    setvehiclePicture(file);
                  }
                }}
              />
            </div>

            <div className="mb-s-200 mt-s-200">
              <FileUpload
                className="mb-s-200 mt-s-200"
                label="Anexar foto da CNH"
                uploadPreview={true}
                accept="image/*"
                multiple={false}
                maxSizeInBytes={2097152}
                onChange={([file]) => {
                  if (file) {
                    setCnhPicture(file);
                  }
                }}
              />
            </div>

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
                  Cadastrar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
