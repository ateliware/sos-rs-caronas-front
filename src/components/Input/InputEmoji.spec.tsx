import { render } from '@testing-library/react';

import InputEmoji from './InputEmoji';

describe('InputEmoji', () => {
  it('renders', async () => {
    const { container } = render(<InputEmoji />);
    const inputEmoji = container.querySelector('.form-input__emoji-picker');
    const openEmojiPicker = inputEmoji?.firstChild;
    const emojiPickerWrapper = inputEmoji?.lastChild;

    expect(emojiPickerWrapper).toHaveClass(
      'form-input__emoji-picker__wrapper',
      { exact: true }
    );
    expect(openEmojiPicker).toHaveClass('btn btn--icon', { exact: true });
    expect(openEmojiPicker).toHaveAttribute('type', 'button');
  });
});
