import { ReactNode, useId, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import InputMask from 'react-input-mask';

import InputOption, { optionsControl } from './InputOption';
import InputEmoji from './InputEmoji';
import maskToCurrency from './masks/currency';

type Masks = typeof masks;

export type Props = {
  className?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  caption?: string;
  disabled?: boolean;
  error?: boolean;
  size?: 'large' | 'small';
  prefixes?: ReactNode;
  mask?: keyof Masks;
  suffixes?: ReactNode;
  type?: string;
  form?: Partial<UseFormRegisterReturn>;
  emojiPicker?: boolean;
  options?: string[];
  onOptionChange?: (value: number) => void;
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

const masks = {
  currency: 'R$ 99999999999999',
  date: '99/99/9999',
  hour: '99:99',
  zipCode: '99999-999',
  phone: '(99) 99999-9999',
  color: ['#', ...new Array(6).fill(/[a-f0-9]/i)],
  onlyNumbers: '99999999999',
};

const hiddenMaskPlaceholder = ['currency', 'color', 'zipCode', 'onlyNumbers'];

const inputMask = (mask: keyof Masks) => masks[mask] ?? '';
const inputStateChange = (mask?: string) =>
  mask === 'currency' ? maskToCurrency : undefined;

export default function Input(props: Props) {
  const id = useId();
  const inputSize = props.size ? ` form-input--${props.size}` : '';
  const [activeOption, setActiveOption] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);
  const mask = inputMask(props.mask as keyof Masks);
  const maskPlaceholder = hiddenMaskPlaceholder.includes(props.mask ?? '')
    ? null
    : '_';
  const beforeMaskedStateChange = inputStateChange(props.mask);

  return (
    <div className={inputContainerClasses(props)}>
      {props.label && (
        <label htmlFor={`input-${id}`} className="form-input__label">
          {props.label}
        </label>
      )}
      <div className="form-input__addons__container">
        {props.prefixes}
        <InputMask
          mask={mask}
          maskPlaceholder={maskPlaceholder}
          beforeMaskedStateChange={beforeMaskedStateChange}
          type={props.type}
          id={`input-${id}`}
          name={props.name}
          aria-invalid={props.error}
          className={`form-input${inputSize}`}
          placeholder={props.placeholder}
          disabled={props.disabled}
          {...props.form}
          {...optionsControl(
            showOptions,
            setShowOptions,
            activeOption,
            setActiveOption,
            props.options,
            props.onOptionChange
          )}
        />

        {props.suffixes && (
          <div className="form-input__addons__addon form-input__addons__addon--right">
            {props.suffixes}
          </div>
        )}
      </div>
      {showOptions && (
        <InputOption
          inputId={id}
          options={props.options}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          onOptionChange={props.onOptionChange}
        />
      )}
      {props.caption && (
        <span className="text-left form-input__caption">{props.caption}</span>
      )}
      {props.emojiPicker && <InputEmoji onEmojiClick={props.onEmojiClick} />}
    </div>
  );
}
