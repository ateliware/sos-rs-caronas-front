import { render, screen } from '@testing-library/react';
import RadioButton from './RadioButton';
import RadioForm from './RadioForm';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('RadioForm', () => {
  it('renders', () => {
    const value1 = 'value 1';
    const value2 = 'value 2';

    const { container } = render(
      <RadioForm name="radioForm">
        <RadioButton label="Option 1" value={value1} />
        <RadioButton label="Option 2" value={value2} />
      </RadioForm>
    );

    const radioValue = container.querySelector('.form-check-input');
    expect(radioValue).toHaveTextContent('');
  });

  it('renders with variants', () => {
    const { container } = render(
      <RadioForm name="radioForm" disabled error="error message">
        <RadioButton label="Option 1" value="value 1" />
        <RadioButton label="Option 2" value="value 2" />
      </RadioForm>
    );
    // get radio form by class "radio__form"
    const radioForm = container.querySelector('.radio__form');
    const radioButton = container.querySelector('.form-check-input');
    const radioLabel = radioButton?.nextElementSibling;
    const error = screen.getByText('error message');

    expect(radioForm).toHaveClass('radio__form');
    expect(radioButton).toHaveClass('form-check-input');
    expect(radioButton).toHaveAttribute('name', 'radioForm');
    expect(radioButton).toBeDisabled();
    expect(radioLabel).toHaveClass('form-check-label');
    expect(radioLabel).toHaveTextContent('Option 1');
    expect(error).toHaveClass('form-input__caption');
    expect(error).toHaveTextContent('error message');
  });

  it('warns if non RadioButton element is child to RadioForm', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    render(
      <RadioForm name="radioForm">
        <>not a radio button</>
        <RadioButton label="Option 1" value={'valid radio button'} />
        <>also not a radio button</>
      </RadioForm>
    );

    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });
});
