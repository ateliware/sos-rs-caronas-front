import { fireEvent, render } from '@testing-library/react';

import TableRow from './TableRow';

describe('TableRow', () => {
  it('should render selecting', () => {
    const setSelectedKeys = jest.fn();
    const onSelectionChange = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <TableRow
            showColumnSelector={true}
            watch={jest.fn()}
            tableId="table"
            dataKey="id"
            row={{ id: 1, name: 'John Doe' }}
            columns={[
              { fromKey: 'id', header: 'Id' },
              { fromKey: 'name', header: 'Name' },
            ]}
            checkable
            selectedKeys={{}}
            invertSelection={false}
            setSelectedKeys={setSelectedKeys}
            onSelectionChange={onSelectionChange}
          />
        </tbody>
      </table>
    );
    expect(container).toMatchSnapshot();

    let checkbox = container.querySelector('.form-check-input') as Element;
    fireEvent.click(checkbox);
    expect(setSelectedKeys).toBeCalledWith({ '1': true });
    expect(onSelectionChange).toBeCalledWith({ '1': true }, false);
  });

  it('should render unselecting', () => {
    const setSelectedKeys = jest.fn();
    const onSelectionChange = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <TableRow
            showColumnSelector={true}
            watch={jest.fn()}
            tableId="table"
            dataKey="id"
            row={{ id: 1, name: 'John Doe' }}
            columns={[
              { fromKey: 'id', header: 'Id' },
              { fromKey: 'name', header: 'Name' },
            ]}
            checkable
            invertSelection
            selectedKeys={{ '1': true }}
            setSelectedKeys={setSelectedKeys}
            onSelectionChange={onSelectionChange}
          />
        </tbody>
      </table>
    );
    expect(container).toMatchSnapshot();

    let checkbox = container.querySelector('.form-check-input') as Element;
    fireEvent.click(checkbox);
    expect(setSelectedKeys).toBeCalledWith({});
    expect(onSelectionChange).toBeCalledWith({}, true);
  });
});
