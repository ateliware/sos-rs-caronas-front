import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  name?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  form?: Partial<UseFormRegisterReturn>;
};

export default function RadioButton(props: Props) {
  const id = useId();

  return (
    <div className="form-check">
      <input
        id={`radio-${id}`}
        className="form-check-input"
        type="radio"
        name={props.name}
        disabled={props.disabled}
        value={props.value}
        {...props.form}
      />
      <label className="form-check-label" htmlFor={`radio-${id}`}>
        {props.label}
      </label>
    </div>
  );
}
