import { UseFormRegisterReturn } from 'react-hook-form';
import Chip from '../Chip/Chip';

type Props = {
  chips: { key: string; text: string; active: boolean; disabled: boolean }[];
  onChipClick?: (index: number) => void;
  sizeChips?: 'small' | 'medium';
  error?: boolean;
  caption?: string;
  form?: Partial<UseFormRegisterReturn>;
};

export function inputContainerClasses({ error }: Pick<Props, 'error'>) {
  const inputContainerClasses = ['form-input__container'];
  if (error) inputContainerClasses.push('form-input__container--error');

  return inputContainerClasses.join(' ');
}

export default function ChipGroup(props: Props) {
  function handleChipClick(index: number) {
    if (props.onChipClick) {
      props.onChipClick(index);
    }
  }

  return (
    <div
      className={`chip-group d-flex flex-direction-column ${inputContainerClasses(
        props
      )}`}
    >
      <div className="d-flex">
        {props.chips.map((chip, index) => (
          <Chip
            key={chip.text}
            className={`chip-group__chip ${chip.active ? 'chip--active' : ''} ${
              index !== props.chips.length - 1 ? 'mr-s-100' : ''
            }`}
            onClick={() => handleChipClick(index)}
            disabled={chip.disabled}
            size={props.sizeChips}
          >
            {chip.text}
          </Chip>
        ))}
      </div>

      {props.caption && (
        <span className="text-left form-input__caption">{props.caption}</span>
      )}
    </div>
  );
}
