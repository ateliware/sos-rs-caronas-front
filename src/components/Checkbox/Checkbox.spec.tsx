import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders', () => {
    render(<Checkbox label="Test Checkbox" />);
    const checkbox: HTMLInputElement = screen.getByLabelText('Test Checkbox');

    expect(checkbox).toHaveClass('form-check-input');
  });

  it('renders with variants', () => {
    render(
      <Checkbox
        label="Intermediate Checkbox"
        indeterminate
        disabled
        error="error message"
        form={{ name: 'formField' }}
      />
    );
    render(<Checkbox label="Not Intermediate Checkbox" />);
    const intermediateCheckbox: HTMLInputElement = screen.getByLabelText(
      'Intermediate Checkbox'
    );
    const notIntermediateCheckbox: HTMLInputElement = screen.getByLabelText(
      'Not Intermediate Checkbox'
    );

    const error = screen.getByText('error message');
    expect(intermediateCheckbox.indeterminate).toBe(true);
    expect(notIntermediateCheckbox.indeterminate).toBe(false);
    expect(intermediateCheckbox).toBeDisabled();
    expect(notIntermediateCheckbox).toBeEnabled();
    expect(intermediateCheckbox).toHaveAttribute('name', 'formField');
    expect(error).toHaveClass('form-input__caption');
  });
});
