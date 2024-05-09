import { render, screen } from '@testing-library/react';

import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders with variations', () => {
    render(<PageHeader title="Title" actions={'Actions'} />);
    const title = screen.getByText('Title');
    const actions = screen.getByText('Actions');
    const pageHeader = title.parentElement;

    expect(title).toBeVisible();
    expect(actions).toBeVisible();
    expect(actions).toHaveClass('d-flex page-header-actions');
    expect(pageHeader).toBeVisible();
    expect(pageHeader).toHaveClass('row d-flex align-items-center');
  });
});
