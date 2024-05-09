import { render } from '@testing-library/react';

import SidebarSeparator from './SidebarSeparator';

describe('SidebarSeparator', () => {
  it('renders', () => {
    const { container } = render(<SidebarSeparator />);
    const separator = container.firstChild;

    expect(separator).toHaveClass('sidebar__separator');
  });
});
