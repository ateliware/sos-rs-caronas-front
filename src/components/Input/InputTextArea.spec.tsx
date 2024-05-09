import { render, screen } from '@testing-library/react';

import InputTextArea from './InputTextArea';

describe('InputTextArea', () => {
  it('renders with variants', () => {
    const placeholder = 'test inputTextArea';
    render(
      <InputTextArea
        placeholder={placeholder}
        disabled
        error
        caption="error message"
        form={{ name: 'formField' }}
      />
    );

    const inputTextArea = screen.getByPlaceholderText(placeholder);
    const error = screen.getByText('error message');

    expect(inputTextArea).toBeDisabled();
    expect(inputTextArea).toHaveAttribute('name', 'formField');
    expect(error).toHaveClass('form-input__caption');
  });

  it('renders with emoji picker', () => {
    const placeholder = 'test inputTextArea';
    const { container } = render(
      <InputTextArea
        placeholder={placeholder}
        emojiPicker
        form={{ name: 'formField' }}
      />
    );

    const emojiPicker = container.querySelector('.form-input__emoji-picker');

    expect(emojiPicker).toBeInTheDocument();
  });
});
