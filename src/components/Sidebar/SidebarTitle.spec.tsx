import { render, screen } from '@testing-library/react';

import SidebarTitle from './SidebarTitle';

describe('SidebarTitle', () => {
  it('renders', () => {
    const { container } = render(<SidebarTitle>title</SidebarTitle>);
    const title = container.firstChild;

    expect(screen.getByText('title')).toEqual(title);
    expect(title).toHaveClass('sidebar__title');
  });
});
