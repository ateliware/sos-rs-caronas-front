import { fireEvent, render } from '@testing-library/react';

import PasswordInput from './PasswordInput';

describe('PasswordInput', () => {
  it('renders input', () => {
    const { container } = render(<PasswordInput className="custom-input" />);

    const formInput = container.querySelector('.custom-input') as Element;
    const inputContainer = formInput.firstChild as Element;
    const passwordInput = inputContainer.firstChild as Element;
    const toggleButton = container.querySelector('.btn__toggle') as Element;

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(toggleButton).toHaveTextContent('visibility');
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('visibility_off');
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
