import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import InputEmoji from './InputEmoji';

export type Props = {
  className?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  caption?: string;
  disabled?: boolean;
  error?: boolean;
  rows?: number;
  form?: Partial<UseFormRegisterReturn>;
  emojiPicker?: boolean;
  onEmojiClick?: (value: string) => void;
};

export function inputContainerClasses({
  error,
  disabled,
  className,
}: Pick<Props, 'className' | 'error' | 'disabled'>) {
  const inputContainerClasses = ['form-input__container'];
  if (error) inputContainerClasses.push('form-input__container--error');
  if (disabled) inputContainerClasses.push('form-input__container--disabled');
  if (className) inputContainerClasses.push(className);

  return inputContainerClasses.join(' ');
}

export default function Input(props: Props) {
  const id = useId();

  return (
    <div className={inputContainerClasses(props)}>
      {props.label && (
        <label htmlFor={`input-${id}`} className="form-input__label">
          {props.label}
        </label>
      )}
      <div className="form-input__addons__container">
        <textarea
          rows={props.rows ?? 4}
          id={`input-${id}`}
          className="form-input"
          name={props.name}
          aria-invalid={props.error}
          placeholder={props.placeholder}
          disabled={props.disabled}
          {...props.form}
        />
      </div>
      {props.caption && (
        <span className="text-left form-input__caption">{props.caption}</span>
      )}
      {props.emojiPicker && <InputEmoji onEmojiClick={props.onEmojiClick} />}
    </div>
  );
}
