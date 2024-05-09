import { render, screen } from '@testing-library/react';

import PopOverTab from './PopOverTab';

describe('PopOverTab', () => {
  it('renders', () => {
    render(
      <PopOverTab icon="icon" header="header">
        content
      </PopOverTab>
    );

    expect(screen.getByText('icon')).toBeInTheDocument();
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
