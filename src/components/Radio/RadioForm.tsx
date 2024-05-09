import { Children, cloneElement, useId } from 'react';
import RadioButton from './RadioButton';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  children: JSX.Element | JSX.Element[];
  name?: string;
  error?: string;
  disabled?: boolean;
  form?: Partial<UseFormRegisterReturn>;
};

export default function RadioForm({
  name,
  children,
  error,
  disabled,
  form,
}: Props) {
  const id = useId();

  const reactiveRadioButtons = Children.map(children, (child: JSX.Element) => {
    if (child.type === RadioButton) {
      return cloneElement(child, {
        name: child.props.name || name,
        disabled: child.props.disabled || disabled,
        form,
      });
    } else {
      console.warn(
        'Non RadioButton component detected inside RadioForm. This may lead to unexpected issues.'
      );
    }
  });

  return (
    <>
      <div className="radio__form" id={`radio-${id}`}>
        {reactiveRadioButtons}
      </div>
      {error && (
        <div className="form-input__container form-input__container--error mb-s-100">
          <div className="form-input__caption">{error}</div>
        </div>
      )}
    </>
  );
}
