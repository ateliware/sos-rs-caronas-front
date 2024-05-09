import { render } from '@testing-library/react';

import MainContent from './MainContent';

describe('MainContent', () => {
  it('renders', () => {
    const { container } = render(<MainContent />);
    const main = container.firstChild;

    expect(main).toHaveClass('main__content main__content--md');
  });

  it('renders with variants', () => {
    const { container } = render(<MainContent className="custom" collapsed />);
    const main = container.firstChild;

    expect(main).toHaveClass('main__content main__content--none custom');
  });
});
