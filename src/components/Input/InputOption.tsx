export function optionsControl(
  showOptions: boolean,
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
  activeOption: number,
  setActiveOption: React.Dispatch<React.SetStateAction<number>>,
  options: string[] | undefined,
  onOptionChange?: (value: number) => void
) {
  if (!options) return {};
  return {
    onInput: () => {
      if (options && !showOptions) {
        setShowOptions(true);
        setActiveOption(-1);
      }
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!options || !showOptions) return;
      if (e.key === 'ArrowDown' && activeOption < options.length - 1)
        setActiveOption(activeOption + 1);
      else if (e.key === 'ArrowUp' && activeOption > 0)
        setActiveOption(activeOption - 1);
      else if (e.key === 'Enter') {
        onOptionChange?.(activeOption);
        setShowOptions(false);
      } else return;
      e.preventDefault();
    },
    onFocus: () => {
      if (options) {
        setShowOptions(true);
        setActiveOption(-1);
      }
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      if (!options?.includes(e.target.value)) onOptionChange?.(-1);
      if (!e.relatedTarget?.classList.contains('form-input__option'))
        setShowOptions(false);
    },
  };
}

export default function InputOption(props: {
  inputId: string;
  options?: string[];
  activeOption: number;
  setActiveOption: React.Dispatch<React.SetStateAction<number>>;
  showOptions: boolean;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
  onOptionChange?: (value: number) => void;
}) {
  return (
    <div className="form-input__options">
      {props.options?.map((option, index) => {
        const btnClasses = ['btn', 'form-input__option'];
        if (props.activeOption === index)
          btnClasses.push('form-input__option--active');

        return (
          <button
            type="button"
            key={`option-${props.inputId}-${option}`}
            className={btnClasses.join(' ')}
            onClick={() => {
              props.onOptionChange?.(index);
              props.setShowOptions(false);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
