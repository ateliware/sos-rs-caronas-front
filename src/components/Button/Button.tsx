import { PropsWithChildren, ReactNode, useRef } from 'react';

import { Spinner } from '../Spinner';

type Props = {
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  design?: 'filled' | 'outlined' | 'transparent';
  alignText?: 'left' | 'center' | 'right';
  weight?: 'light' | 'normal' | 'bold';
  color?: string;
  prefixes?: ReactNode;
  suffixes?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  textClassName?: string;
  isLoading?: boolean;
  title?: string;
  onClick?: (params: any) => void;
};

export default function Button(props: PropsWithChildren<Props>) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonClasses = ['btn'];
  const buttonBodyClasses: string[] = ['btn__body'];
  if (props.className) {
    buttonClasses.push(props.className);
  }

  if (props.disabled) {
    buttonClasses.push('btn--disabled');
  }

  if (props.design !== 'transparent') {
    buttonClasses.push(`btn--${props.design ?? 'filled'}`);
  }

  if (props.alignText) {
    buttonBodyClasses.push(`justify-${props.alignText}`);
  }

  if (props.weight) {
    buttonBodyClasses.push(`font-weight-${props.weight}`);
  }

  buttonClasses.push(`btn--${props.color ?? 'primary'}`);
  buttonClasses.push(`btn--${props.size ?? 'medium'}`);

  const spinnerPosition = props.suffixes ? 'right' : 'left';

  return (
    <button
      title={props.title}
      ref={buttonRef}
      disabled={props.disabled || props.isLoading}
      className={buttonClasses.join(' ')}
      onClick={props.onClick}
      type={props.type ?? 'button'}
    >
      <div className={`${buttonBodyClasses.join(' ')}`}>
        {props.isLoading && spinnerPosition === 'left' ? (
          <Spinner />
        ) : (
          props.prefixes
        )}
        {props.children && (
          <div className={`btn__body__text ${props.textClassName || ''}`}>
            {props.children}
          </div>
        )}
        {props.isLoading && spinnerPosition === 'right' ? (
          <Spinner />
        ) : (
          props.suffixes
        )}
      </div>
    </button>
  );
}
