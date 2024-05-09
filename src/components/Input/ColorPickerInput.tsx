import { useRef } from 'react';

import { Icon } from '../Icon';

import Input, { Props as InputProps } from './Input';

export type Props = {
  onSelect: (color: String) => void;
  colorSelected: string;
};

export default function ColorPickerInput(props: InputProps & Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input
        mask="color"
        prefixes={
          <div
            className="color-selected"
            style={{ backgroundColor: props.colorSelected }}
          />
        }
        suffixes={
          <div
            className="pr-s-100 m-s-50 mt-s-100 pointer"
            onClick={() => {
              ref.current?.focus();
              ref.current?.click();
            }}
          >
            <input
              type="color"
              ref={ref}
              onChange={(event) => {
                props.onSelect(event.target.value);
              }}
              tabIndex={-1}
              style={{ visibility: 'hidden', display: 'hidden' }}
              className="hidden"
            />
            <Icon>colorize</Icon>
          </div>
        }
        {...props}
      />
    </>
  );
}
