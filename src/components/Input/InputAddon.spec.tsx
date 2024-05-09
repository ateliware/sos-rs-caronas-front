import { render, screen } from '@testing-library/react';

import InputAddon, { getDirection } from './InputAddon';

describe('InputAddon', () => {
  test('getDirection', () => {
    expect(getDirection({ left: true })).toEqual('--left');
    expect(getDirection({ center: true })).toEqual('--center');
    expect(getDirection({ right: true })).toEqual('--right');
  });

  it('renders', () => {
    const addonContent = 'addon';
    render(<InputAddon>{addonContent}</InputAddon>);
    const inputAddon = screen.getByText(addonContent);

    expect(inputAddon).toHaveClass('form-input__addons__text', { exact: true });
  });
});
