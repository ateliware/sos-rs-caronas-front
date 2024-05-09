import { render, screen } from '@testing-library/react';
import RadioButton from './RadioButton';

describe('RadioButton', () => {
  it('renders', () => {
    const label = 'radio button';

    render(<RadioButton label={label} />);

    const radioButton = screen.getByLabelText(label);
    expect(radioButton).toHaveClass('form-check-input');
  });
});
