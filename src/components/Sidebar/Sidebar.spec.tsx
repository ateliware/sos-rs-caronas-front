import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter component
import Sidebar from './Sidebar';
import { AuthProvider } from '@contexts/AuthProvider';

describe('Sidebar', () => {
  it('renders', () => {
    const { container } = render(
      <Router>
        <AuthProvider>
          <Sidebar />
        </AuthProvider>
      </Router>
    );
    const sidebar = container.firstChild;

    expect(sidebar).toHaveClass(
      'drawer drawer--md sidebar drawer--open drawer--left'
    );
  });

  it('renders with variants', () => {
    const { container } = render(
      <Router>
        <AuthProvider>
          <Sidebar className="custom" collapsed />
        </AuthProvider>
      </Router>
    );
    const sidebar = container.firstChild;

    expect(sidebar).toHaveClass(
      'drawer drawer--none sidebar custom drawer--open'
    );
    expect(container.children.length).toEqual(1);
  });
});
