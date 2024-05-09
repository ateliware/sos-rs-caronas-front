import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  form?: Partial<UseFormRegisterReturn>;
  onChange?: () => void;
  defaultChecked?: boolean;
};

export default function Switch(props: Props) {
  const id = useId();

  return (
    <>
      <div className="form-check form-switch">
        <input
          onChange={props.onChange}
          name={props.name}
          id={`switch-${id}`}
          className="form-check-input"
          type="checkbox"
          role="switch"
          disabled={props.disabled}
          defaultChecked={props.defaultChecked}
          {...props.form}
        />
        <label className="form-check-label" htmlFor={`switch-${id}`}>
          {props.label}
        </label>
      </div>
      {props.error && (
        <div className="form-input__container form-input__container--error mb-s-100">
          <div className="form-input__caption">{props.error}</div>
        </div>
      )}
    </>
  );
}
