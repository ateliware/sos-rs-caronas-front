import { useEffect, useId, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label?: string;
  error?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  form?: Partial<UseFormRegisterReturn>;
};

export default function Checkbox(props: Props) {
  const id = useId();
  const cRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cRef && cRef.current) {
      cRef.current.indeterminate = props.indeterminate ?? false;
    }
  }, [cRef, props.indeterminate]);

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={`checkbox-${id}`}
          disabled={props.disabled}
          ref={cRef}
          {...props.form}
        />
        <label htmlFor={`checkbox-${id}`} className="form-check-label">
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
