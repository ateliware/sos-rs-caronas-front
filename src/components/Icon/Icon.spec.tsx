import { render, screen } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
  it('renders', () => {
    const iconValue = 'test icon';
    const { container } = render(<Icon>{iconValue}</Icon>);
    const icon = screen.getByText(iconValue);

    expect(container.firstChild?.firstChild?.nodeValue).toEqual(iconValue);
    expect(icon).toHaveClass('material-symbols-rounded', { exact: true });
  });
});
