import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthProvider';
import Drawer from './Drawer';

describe('Drawer', () => {
  it('renders', () => {
    const { container } = render(
      <Router>
        <AuthProvider>
          <Drawer />
        </AuthProvider>
      </Router>
    );
    const drawer = container.firstChild;
    const overlay = container.lastChild;

    expect(drawer).toHaveClass('drawer drawer--md drawer--right');
    expect(overlay).toHaveClass('drawer__overlay');
  });

  it('renders with variants', () => {
    const { container } = render(
      <Router>
        <AuthProvider>
          <Drawer
            open
            className="custom"
            size="xxl"
            float="right"
            overlay={false}
            closable
            onClickAway={() => {}}
          />
        </AuthProvider>
      </Router>
    );
    const drawer = container.firstChild;
    const closeButton = screen.getAllByRole('button')[0];

    expect(drawer).toHaveClass(
      'drawer drawer--xxl custom drawer--open drawer--right'
    );
    expect(closeButton).toHaveAttribute('aria-label', 'Close drawer');
    expect(closeButton).toBeInTheDocument();
    expect(container.children.length).toEqual(1);
  });
});
