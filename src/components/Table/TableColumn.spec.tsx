import { fireEvent, render } from '@testing-library/react';

import TableColumn from './TableColumn';

describe('TableColumn', () => {
  it('should render', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableColumn fromKey="name" header="Name" />
          </tr>
        </thead>
      </table>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with variants', () => {
    const onAction = jest.fn();
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableColumn
              className="custom"
              headerAlign="center"
              fromKey="name"
              header="Name"
              width="100px"
              filterType="text"
              onAction={onAction}
            />
          </tr>
        </thead>
      </table>
    );
    expect(container).toMatchSnapshot();

    const th = container.querySelector('th');
    expect(th).toHaveClass('table__cell custom');
    expect(th).toHaveStyle('width: 100px');

    const buttons = container.querySelector('button');
    fireEvent.click(buttons as Element);
    expect(onAction).toBeCalledWith('name');
  });
});
