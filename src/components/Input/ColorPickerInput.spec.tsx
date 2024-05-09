import { fireEvent, render } from '@testing-library/react';

import ColorPickerInput from './ColorPickerInput';

describe('ColorPickerInput', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ColorPickerInput onSelect={() => {}} colorSelected="#000" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show color in the input`s prefix correctly', () => {
    const { container } = render(
      <ColorPickerInput onSelect={() => {}} colorSelected="#000" />
    );

    const color = container.querySelector(
      '.form-input__addons__container > div'
    );

    expect(color).toHaveStyle('background-color: #000');
  });

  it('Should show colorpicker modal correctly', () => {
    const { container } = render(
      <ColorPickerInput onSelect={() => {}} colorSelected="#000" />
    );

    const colorButton = container.querySelector(
      '.form-input__addons__addon--right > div'
    );

    const colorInput = container.querySelector(
      '.form-input__addons__addon--right > div > input'
    );

    fireEvent.click(colorButton!);

    expect(colorInput).toHaveFocus();
  });
});
