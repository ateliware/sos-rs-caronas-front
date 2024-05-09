import { fireEvent, render, screen } from '@testing-library/react';

import Input, { inputContainerClasses } from './Input';

describe('Input', () => {
  test('inputContainerClasses', () => {
    expect(inputContainerClasses({ error: false, disabled: false })).toEqual(
      'form-input__container'
    );
    expect(inputContainerClasses({ error: false, disabled: true })).toEqual(
      'form-input__container form-input__container--disabled'
    );
    expect(inputContainerClasses({ error: true, disabled: false })).toEqual(
      'form-input__container form-input__container--error'
    );
    expect(inputContainerClasses({ error: true, disabled: true })).toEqual(
      'form-input__container form-input__container--error form-input__container--disabled'
    );
  });

  it('renders with variants', () => {
    const placeholder = 'test input';
    render(
      <Input
        placeholder={placeholder}
        disabled
        error
        caption="error message"
        form={{ name: 'formField' }}
      />
    );

    const input: HTMLInputElement = screen.getByPlaceholderText(placeholder);
    const error = screen.getByText('error message');

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('name', 'formField');
    expect(error).toHaveClass('form-input__caption');
  });

  it('renders with options', () => {
    const placeholder = 'test input';
    const options = ['option 1', 'option 2', 'option 3'];
    const optionChange = jest.fn();
    render(
      <Input
        placeholder={placeholder}
        options={options}
        onOptionChange={optionChange}
      />
    );

    const input: HTMLInputElement = screen.getByPlaceholderText(placeholder);
    fireEvent.input(input, { target: { value: 'option' } });
    const option3 = screen.getByText('option 3');

    expect(input.value).toBe('option');
    fireEvent.click(option3);
    expect(optionChange).toBeCalledWith(2);
  });

  it('renders with emoji picker', () => {
    const placeholder = 'test input';
    const { container } = render(
      <Input
        placeholder={placeholder}
        emojiPicker
        form={{ name: 'formField' }}
      />
    );

    const emojiPicker = container.querySelector('.form-input__emoji-picker');

    expect(emojiPicker).toBeInTheDocument();
  });
});
