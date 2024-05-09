import { render, screen } from '@testing-library/react';

import InputIcon from './InputIcon';

describe('InputIcon', () => {
  it('renders', () => {
    const iconContent = 'person';
    render(<InputIcon>{iconContent}</InputIcon>);
    const inputIcon = screen.getByText(iconContent);

    expect(inputIcon).toHaveClass(
      'material-symbols-rounded form-input__addons__icon',
      { exact: true }
    );
  });
});
