import { fireEvent, render, screen } from '@testing-library/react';

import PopOver from './PopOver';

describe('PopOver', () => {
  it('renders', () => {
    const { container } = render(
      <PopOver
        fixedContent={<div>Fixed</div>}
        togglableContent={<div>Togglable</div>}
      />
    );

    expect(container.querySelector('.popover-trigger')?.firstChild).toHaveClass(
      'd-flex align-items-center justify-center pl-s-300 pr-s-100',
      { exact: true }
    );
  });

  it('renders togglable content only when mouse enters trigger', () => {
    render(
      <PopOver
        fixedContent={<div>Fixed</div>}
        togglableContent={<div>Togglable</div>}
      />
    );
    const trigger = screen.getByText('Fixed');
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Togglable')).toBeInTheDocument();
    const popoverContent = screen.getByText('Togglable').parentElement;
    expect(popoverContent).toHaveStyle('right: 0');
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Togglable')).not.toBeInTheDocument();
  });

  it('renders with variants', () => {
    const { container } = render(
      <PopOver
        fixedContent={<div>Fixed</div>}
        togglableContent={<div>Togglable</div>}
        noStyling
        direction="right"
      />
    );
    expect(container.querySelector('.popover-trigger')?.firstChild).toHaveClass(
      '',
      { exact: true }
    );
    const trigger = screen.getByText('Fixed');
    fireEvent.mouseEnter(trigger);
    const popoverContent = screen.getByText('Togglable').parentElement;
    expect(popoverContent).toHaveStyle('right: auto');
  });
});
