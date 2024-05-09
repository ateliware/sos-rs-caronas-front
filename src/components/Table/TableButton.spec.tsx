import { fireEvent, render } from '@testing-library/react';

import TableButton from './TableButton';

describe('TableButton', () => {
  it('should render', () => {
    const { container } = render(<TableButton />);
    expect(container).toMatchSnapshot();
  });

  it('should render with variants', () => {
    const action = jest.fn();
    const { container } = render(
      <TableButton onClick={action}>add</TableButton>
    );
    expect(container).toMatchSnapshot();

    const button = container.querySelector('button') as Element;
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(action).toHaveBeenCalled();
  });
});
