import React, { useEffect, useId, useState } from 'react';
import Cropper, { Area, CropperProps } from 'react-easy-crop';
import { UseFormRegisterReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import uploadLogo from '@assets/icons/upload-image.svg';
import { Modal } from '../Modal';
import { useConfirmationModal } from '@hooks/useConfirmationModal';
import { fileToBlobURL } from '@services/io/file';
import { Button } from '../Button';
import { Icon } from '../Icon';

import getCroppedImg from './imageCrop';

type Props<TIsRemovable extends boolean> = {
  className?: string;
  image?: string | File;
  imageHeight?: number;
  fileName?: string;
  multiple?: boolean;
  accept?: string;
  name?: string;
  hideLabel?: boolean;
  uploadPreview?: boolean;
  label?: string;
  disclaimer?: string;
  error?: string;
  maxSizeInBytes?: number;
  form?: Partial<UseFormRegisterReturn>;
  openCropImageModal?: boolean;
  cropProps?: Partial<CropperProps>;
  isRemovable?: TIsRemovable;
  onChange?: (files: GenericOnChangeParam<TIsRemovable>) => void;
};

type GenericOnChangeParam<TIsRemovable extends boolean> =
  TIsRemovable extends true ? Array<File | null> : Array<File>;

export default function FileUploadImgCrop<TIsRemovable extends boolean = false>(
  props: Props<TIsRemovable>
) {
  const id = useId();
  const uploadClasses = ['upload__content'];
  if (props.className) uploadClasses.push(props.className);
  const [file, setFile] = React.useState<string | undefined | null>(
    props.image as string
  );
  const [fileName, setFileName] = React.useState<string | undefined>(
    props.fileName
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropImageData, setCropImageData] = useState<string | null>(null);
  const confirmation = useConfirmationModal();

  useEffect(() => {
    if (props.image instanceof File) {
      setFile(fileToBlobURL(props.image));
    } else if (props.image) {
      setFile(props.image);
    }
  }, [props.image]);

  const uploadPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const upload = event.target.files?.[0];
    const fileName = upload?.name;
    if (upload) {
      setFileName(fileName);
      if (!upload.type.includes('image')) return;

      const fileBlob = fileToBlobURL(upload);
      setFile(fileBlob);
    }
  };

  const cropImage = async (fileUrl: string) => {
    try {
      const { file, url } = await getCroppedImg(fileUrl, croppedAreaPixels!, 0);
      props.onChange?.([new File([file!], 'image.crop')]);
      if (props.uploadPreview) setFile(url);

      setCropImageData(null);
    } catch (error) {
      toast.error('Erro ao cortar imagem');
      console.error(error);
    }
  };

  return (
    <>
      <div className="upload">
        <div className={uploadClasses.join(' ')}>
          {file && props.isRemovable && (
            <div
              title="Remover imagem"
              className="upload__content__remove"
              onClick={() => {
                confirmation({
                  title: 'Limpar imagem',
                  confirmButtonTitle: 'Confirmar',
                  description: 'Deseja realmente excluir a imagem?',
                  onSubmit: () => {
                    setFile(null);
                    setFileName(undefined);
                    props.onChange?.([
                      null,
                    ] as GenericOnChangeParam<TIsRemovable>);
                  },
                });
              }}
            >
              <Icon>close</Icon>
            </div>
          )}
          <input
            id={id}
            className="upload__content__input"
            type="file"
            multiple={props.multiple}
            name={props.name}
            accept={props.accept}
            onChange={async (event) => {
              const arrayFiles = Array.from(event.target.files ?? []);
              if (
                arrayFiles.length &&
                props.maxSizeInBytes != null &&
                arrayFiles[0].size > props.maxSizeInBytes
              ) {
                toast.error('Arquivo muito grande');
                return;
              }

              if (props.uploadPreview) {
                uploadPreview(event);
              }

              if (props.openCropImageModal) {
                const files = arrayFiles.map((it) => fileToBlobURL(it));
                files.map((it) => setCropImageData(it));
              }

              //If has openCropImageModal prop the onChange will trigger when crop was completed
              if (props.onChange && !props.openCropImageModal) {
                props.onChange(arrayFiles);
              }
            }}
          />
          <input type="hidden" {...props.form} />

          {(file && (
            <img
              className="upload__content__image"
              style={{ height: props.imageHeight }}
              src={file}
              alt="upload"
            />
          )) || (
            <img
              className="upload__content__icon"
              src={uploadLogo}
              alt="upload"
              title={fileName}
            />
          )}
          {!props.hideLabel && !file && (
            <label htmlFor={id} className="upload__content__text">
              {props.label || 'Arraste ou clique aqui para enviar imagem'}
            </label>
          )}
        </div>
        {fileName && (
          <span title={fileName} className="upload__filename">
            {fileName}
          </span>
        )}

        {props.disclaimer && (
          <span title={props.disclaimer} className="upload__filename mt-s-100">
            {props.disclaimer}
          </span>
        )}

        {props.error && (
          <div className="form-input__container form-input__container--error mb-s-100">
            <div className="form-input__caption">{props.error}</div>
          </div>
        )}
      </div>

      {!!cropImageData && (
        <Modal
          isOpen={!!cropImageData}
          onClickAway={() => setCropImageData(null)}
        >
          <div className="container p-s-200">
            <div className="modal-title">
              <h3>Editar imagem</h3>
            </div>
            <div style={{ position: 'relative', height: 500 }}>
              <Cropper
                {...props.cropProps}
                image={cropImageData!}
                crop={crop}
                zoom={zoom}
                onCropComplete={(_, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />
            </div>

            <div className="mt-s-200">
              <label htmlFor="range" className="form-label">
                Zoom
              </label>
              <input
                min={1}
                max={10}
                value={zoom}
                onChange={(event) => {
                  setZoom(parseFloat(event.target.value));
                }}
                type="range"
                className="form-range"
                style={{ width: '100%' }}
              />
            </div>

            <div className="row justify-end mt-s-200" style={{ gap: 16 }}>
              <Button
                design="transparent"
                onClick={() => setCropImageData(null)}
              >
                Cancelar
              </Button>
              <Button onClick={() => cropImage(cropImageData!)}>Salvar</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
