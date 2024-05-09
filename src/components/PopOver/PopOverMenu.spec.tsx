import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PopOverMenu from './PopOverMenu';

describe('PopOverMenu', () => {
  it('renders', () => {
    const menu = [
      { onClick: () => {}, content: 'Item 1' },
      { onClick: () => {}, content: 'Item 2' },
    ];

    render(<PopOverMenu menu={menu} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('runs given functions properly', async () => {
    const handleClick = jest.fn();
    const menu = [
      { onClick: handleClick, content: 'Item 1' },
      { onClick: handleClick, content: 'Item 2' },
      { onClick: handleClick, content: 'Hidden item', show: false },
      { onClick: handleClick, content: 'Item 3' },
    ];

    const user = userEvent.setup();

    render(<PopOverMenu menu={menu} />);
    await user.click(screen.getByText('Item 1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
    await user.click(screen.getByText('Item 2'));
    expect(handleClick).toHaveBeenCalledTimes(2);
    await user.click(screen.getByText('Item 3'));
    expect(handleClick).toHaveBeenCalledTimes(3);

    expect(screen.queryByText('Hidden item')).not.toBeInTheDocument();
  });
});
