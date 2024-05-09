import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Select, { Props as SelectProps } from 'react-select';

import { toValueLabel } from '@utils/object';
export type Props = {
  className?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  caption?: string;
  disabled?: boolean;
  error?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  value: unknown;
  form?: Partial<Omit<UseFormRegisterReturn, 'onChange'>>;
  options?: (
    | { label: string; value: string | boolean | number }
    | string
    | any
  )[];
  onSelect?: (newValue: any) => void;
  selectProps?: Partial<SelectProps>;
  fromKey?: string;
};

type Option = Record<string, string | number | boolean>;

type OptionList = Option[];

export function selectContainerClasses({
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

export default function SelectInput(props: Props) {
  const id = useId();

  return (
    <div className={selectContainerClasses(props)}>
      {props.label && (
        <label htmlFor={`select-${id}`} className="form-input__label">
          {props.label}
        </label>
      )}

      <Select
        aria-label={props.label}
        id={`select-${id}`}
        name={props.name}
        aria-invalid={props.error}
        value={generateValue(props)}
        placeholder={props.placeholder}
        isDisabled={props.disabled}
        options={generateOptions(props)}
        isMulti={props.isMulti}
        className="form-select"
        isClearable={props.isClearable}
        isLoading={props.isLoading}
        isSearchable={props.isSearchable}
        classNamePrefix={'form-select'}
        noOptionsMessage={({ inputValue }) => 'Nenhum item encontrado'}
        theme={(theme) => theme}
        {...props.form}
        {...props.selectProps}
        onChange={(value) => {
          let newValue = value;

          if (props.fromKey && props.isMulti) {
            newValue = (value as any[]).map((it) => ({
              id: it.value,
              [props.fromKey!]: it.label,
            }));
          }

          props.onSelect?.(newValue);
        }}
      />

      {props.caption && (
        <span className="text-left form-input__caption">{props.caption}</span>
      )}
    </div>
  );
}

export function generateValue(props: Props): unknown {
  if (typeof props.value === 'string') {
    return toValueLabel(String(props.value));
  }

  if (
    props.fromKey &&
    props.isMulti &&
    (props.value as OptionList)?.some((it) => it[props.fromKey!])
  ) {
    return (props.value as OptionList)?.map((it) => ({
      label: it![props.fromKey!],
      value: it.id,
    }));
  }

  return props.value;
}

export function generateOptions(props: Props) {
  if (props.options?.some((it) => typeof it === 'string')) {
    return props.options.map((it) => toValueLabel(String(it)));
  }

  if (props.fromKey) {
    return (props.options as OptionList).map((it) => ({
      label: it![props.fromKey!],
      value: it.id || it![props.fromKey!],
    }));
  }

  return props.options;
}
