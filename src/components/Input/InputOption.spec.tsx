import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import InputOption, { optionsControl } from './InputOption';

type KeyEvent = React.KeyboardEvent<HTMLInputElement>;
type FocusEvent = React.FocusEvent<HTMLInputElement>;

describe('InputOption', () => {
  it('renders with variants', () => {
    const setActiveOption = jest.fn();
    const setShowOptions = jest.fn();
    const onOptionChange = jest.fn();

    const { container } = render(
      <InputOption
        inputId="test"
        options={['option 1', 'option 2', 'option 3']}
        activeOption={1}
        showOptions={true}
        setActiveOption={setActiveOption}
        setShowOptions={setShowOptions}
        onOptionChange={onOptionChange}
      />
    );

    const formOptions = container.firstChild;
    const option1 = screen.getByText('option 1');
    const option2 = screen.getByText('option 2');
    const option3 = screen.getByText('option 3');

    expect(formOptions).toHaveClass('form-input__options');
    expect(option1).toHaveClass('btn form-input__option');
    expect(option2).toHaveClass(
      'btn form-input__option form-input__option--active'
    );
    expect(option3).toHaveClass('btn form-input__option');

    fireEvent.click(option3);
    expect(onOptionChange).toBeCalledWith(2);
    expect(setShowOptions).toBeCalledWith(false);
  });
});

describe('optionsControl', () => {
  it('returns input with options props (showOptions=false)', () => {
    const showOptions = false;
    const setShowOptions = jest.fn();
    const activeOption = 2;
    const setActiveOption = jest.fn();
    const onOptionChange = jest.fn();

    const params = optionsControl(
      showOptions,
      setShowOptions,
      activeOption,
      setActiveOption,
      ['option 1', 'option 2', 'option 3'],
      onOptionChange
    );
    const { onInput, onKeyDown, onFocus, onBlur } = params;

    onInput?.();
    expect(setShowOptions).toBeCalledWith(true);
    expect(setActiveOption).toBeCalledWith(-1);

    jest.resetAllMocks();
    onKeyDown?.({ key: 'ArrowDown' } as KeyEvent);
    expect(setActiveOption).toBeCalledTimes(0);

    onFocus?.();
    expect(setShowOptions).toBeCalledWith(true);
    expect(setActiveOption).toBeCalledWith(-1);

    jest.resetAllMocks();
    onBlur?.({
      target: { value: 'option 2' },
      relatedTarget: null,
    } as FocusEvent);
    expect(setActiveOption).toBeCalledTimes(0);
    expect(setShowOptions).toBeCalledWith(false);

    jest.resetAllMocks();
    const contains = jest.fn(() => true);
    onBlur?.({
      target: { value: 'unknown option' },
      relatedTarget: { classList: { contains } },
    } as unknown as FocusEvent);
    expect(onOptionChange).toBeCalledWith(-1);
    expect(setShowOptions).toBeCalledTimes(0);
    expect(contains).toBeCalledWith('form-input__option');
  });

  it('returns input with options props (showOptions=true)', () => {
    const showOptions = true;
    const setShowOptions = jest.fn();
    const activeOption = 1;
    const setActiveOption = jest.fn();
    const onOptionChange = jest.fn();
    const preventDefault = jest.fn();

    const params = optionsControl(
      showOptions,
      setShowOptions,
      activeOption,
      setActiveOption,
      ['option 1', 'option 2', 'option 3'],
      onOptionChange
    );
    const { onInput, onKeyDown } = params;

    onInput?.();
    expect(setShowOptions).toBeCalledTimes(0);

    onKeyDown?.({ key: 'ArrowDown', preventDefault } as unknown as KeyEvent);
    expect(setActiveOption).toBeCalledWith(2);
    expect(preventDefault).toBeCalledTimes(1);

    jest.resetAllMocks();
    onKeyDown?.({ key: 'ArrowUp', preventDefault } as unknown as KeyEvent);
    expect(setActiveOption).toBeCalledWith(0);
    expect(preventDefault).toBeCalledTimes(1);

    jest.resetAllMocks();
    onKeyDown?.({ key: 'Enter', preventDefault } as unknown as KeyEvent);
    expect(onOptionChange).toBeCalledWith(1);
    expect(preventDefault).toBeCalledTimes(1);
    expect(setShowOptions).toBeCalledWith(false);

    jest.resetAllMocks();
    onKeyDown?.({ key: 'AnyOtherKey', preventDefault } as unknown as KeyEvent);
    expect(preventDefault).toBeCalledTimes(0);
  });

  it('should be empty if no options are passed', () => {
    const options = undefined;
    const fnMock = jest.fn();
    const params = optionsControl(true, fnMock, 1, fnMock, options, fnMock);

    expect(params).toEqual({});
  });
});
