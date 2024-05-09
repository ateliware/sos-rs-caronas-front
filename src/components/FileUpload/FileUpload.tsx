import React, { Dispatch, SetStateAction, useId } from 'react';
import uploadLogo from '@assets/icons/upload-image.svg';
import { fileToBlobURL } from '@services/io/file';
import { UseFormRegisterReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  className?: string;
  image?: string;
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
  onChange?: (files: File[]) => void;
  form?: Partial<UseFormRegisterReturn>;
};

type StateFunction = Dispatch<SetStateAction<string | undefined>>;
function uploadPreview(
  setFileName: StateFunction,
  setFile: StateFunction,
  event: React.ChangeEvent<HTMLInputElement>
) {
  const upload = event.target.files?.[0];
  const fileName = upload?.name;
  if (upload) {
    setFileName(fileName);
    if (upload.type.includes('image')) {
      const fileBlob = fileToBlobURL(upload);
      setFile(fileBlob);
    }
  }
}

export default function FileUpload(props: Props) {
  const id = useId();
  const uploadClasses = ['upload__content'];
  if (props.className) uploadClasses.push(props.className);
  const [file, setFile] = React.useState<string | undefined>(props.image);
  const [fileName, setFileName] = React.useState<string | undefined>(
    props.fileName
  );

  return (
    <div className="upload">
      <div className={uploadClasses.join(' ')}>
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

            if (props.uploadPreview) uploadPreview(setFileName, setFile, event);
            if (props.onChange)
              props.onChange(Array.from(event.target.files ?? []));
          }}
        />
        <input type="hidden" {...props.form} />
        {(file && (
          <img className="upload__content__image" src={file} alt="upload" />
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
  );
}
