import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, FileUpload, Input, PageHeader } from '@components';

type VehicleFormParams = {
  cnh: string;
  brand: string;
  model: string;
  color: string;
  cnhPhoto: File;
  emergencyNome: string;
  emergencyPhone: string;
};

export default function VehicleFormPage() {
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: VehicleFormParams) => {
    if (!file) {
      setFileError('Anexe uma foto da CNH');
      return;
    }

    data = { ...data, cnhPhoto: file };
    console.log(data);
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
              form={register('brand', { required: 'Obrigatório' })}
              label="Marca do carro"
              placeholder="Marca do carro"
              error={!!errors.brand}
              caption={errors.brand?.message as string}
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
              label="Anexar foto da CNH"
              uploadPreview={true}
              accept="image/*"
              multiple={false}
              maxSizeInBytes={2097152}
              onChange={([file]) => {
                if (file) {
                  setFileError('');
                  setFile(file);
                }
              }}
            />

            {fileError && (
              <p className="text-left text-negative pt-s-100 font-s-100">
                {fileError}
              </p>
            )}

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
                  Continuar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
