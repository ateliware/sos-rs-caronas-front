import { fireEvent, render, screen } from '@testing-library/react';
import Switch from './Switch';

describe('Switch', () => {
  it('renders switch', () => {
    render(<Switch />);
    const switchComponent: HTMLInputElement = screen.getByRole('switch');

    expect(switchComponent.checked).toEqual(false);

    fireEvent.click(switchComponent);

    expect(switchComponent.checked).toEqual(true);
  });

  it('renders with variants', () => {
    render(
      <Switch
        label="label"
        disabled
        error="error message"
        form={{ name: 'formField' }}
      />
    );
    const switchComponent: HTMLInputElement = screen.getByRole('switch');
    const label = screen.getByText('label');
    const error = screen.getByText('error message');

    expect(switchComponent.checked).toEqual(false);
    expect(switchComponent).toHaveClass('form-check-input');
    expect(switchComponent).toBeDisabled();
    expect(switchComponent).toHaveAttribute('name', 'formField');
    expect(label).toHaveClass('form-check-label');
    expect(label).toHaveTextContent('label');
    expect(error).toHaveClass('form-input__caption');
    expect(error).toHaveTextContent('error message');
  });
});
