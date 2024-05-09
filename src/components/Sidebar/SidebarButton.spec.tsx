import { render, screen } from '@testing-library/react';

import SidebarButton from './SidebarButton';

describe('SidebarButton', () => {
  it('renders', () => {
    const { container } = render(<SidebarButton />);
    const button = container.firstChild;

    expect(screen.getByRole('button')).toEqual(button);
    expect(button).toHaveClass('sidebutton');
  });

  it('renders with variants', () => {
    const { container } = render(
      <SidebarButton
        active
        className="custom"
        onClick={() => {}}
        icon="icon"
        label="label page"
      />
    );
    const button = container.firstChild;

    expect(screen.getByRole('button')).toEqual(button);
    expect(screen.getByText('label page')).toBeInTheDocument();
    expect(button).toHaveClass('sidebutton custom sidebutton--active');
  });
});
