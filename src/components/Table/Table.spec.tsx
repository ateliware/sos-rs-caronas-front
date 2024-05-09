import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Table from './Table';
import TableColumn from './TableColumn';

describe('Table', () => {
  it('should render', () => {
    const { container } = render(<Table data={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with variants', () => {
    const { container } = render(
      <Table layout="fixed" className="custom" hoverable checkable data={[]} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with data', async () => {
    const data = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@ateliware.com',
      },
    ];

    const { container } = await waitFor(() => {
      return render(
        <Table data={data} showColumnSelector={false}>
          <TableColumn fromKey="id" header="Id" />
          <TableColumn fromKey="name" header="Name" />
          <TableColumn fromKey="email" header="E-mail" />
        </Table>
      );
    });
    expect(container).toMatchSnapshot();

    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(1);

    const columns = rows[0].querySelectorAll('td');
    expect(columns).toHaveLength(3);

    expect(columns[0]).toHaveTextContent('1');
    expect(columns[1]).toHaveTextContent('John Doe');
    expect(columns[2]).toHaveTextContent('john@ateliware.com');
  });

  it('should render with data and selected', () => {
    const data = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@ateliware.com',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@ateliware.com',
      },
    ];

    const bulkAction = jest.fn();
    const { container } = render(
      <Table
        checkable
        data={data}
        selectedKeys={{ '1': true }}
        showColumnSelector={false}
        onAction={bulkAction}
      >
        <TableColumn fromKey="id" header="Id" />
        <TableColumn fromKey="name" header="Name" />
        <TableColumn
          fromKey="email"
          header="E-mail"
          verticalAlign="middle"
          textAlign="right"
          container
          ellipsis
        />
      </Table>
    );
    expect(container).toMatchSnapshot();

    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);

    const columns = rows[0].querySelectorAll('td');
    expect(columns).toHaveLength(4);

    expect(columns[0]).toContainHTML('input');
    expect(columns[1]).toHaveTextContent('1');
    expect(columns[2]).toHaveTextContent('John Doe');
    expect(columns[3]).toHaveTextContent('john@ateliware.com');

    const bulkActionButton = container.querySelector(
      '.btn--table-action'
    ) as Element;
    expect(bulkActionButton).toBeInTheDocument();
    fireEvent.click(bulkActionButton);
    expect(bulkAction).toBeCalledWith({ '1': true }, false);

    const checkboxes = container.querySelectorAll('.form-check-input');
    expect(checkboxes).toHaveLength(3);

    let selected = container.querySelectorAll('.form-check-input:checked');
    expect(selected).toHaveLength(1);

    const selectAll = container.querySelector('.form-check-input') as Element;
    expect(selectAll).not.toBeChecked();
    fireEvent.click(selectAll);
    expect(selectAll).toBeChecked();

    selected = container.querySelectorAll('.form-check-input:checked');
    expect(selected).toHaveLength(3);

    fireEvent.click(bulkActionButton);
    expect(bulkAction).toBeCalledWith({}, true);

    const selectFirstBtn = container.querySelectorAll(
      '.form-check-input'
    )[1] as Element;
    expect(selectFirstBtn).toBeChecked();
    fireEvent.click(selectFirstBtn);
    expect(selectFirstBtn).not.toBeChecked();

    fireEvent.click(bulkActionButton);
    expect(bulkAction).toBeCalledWith({ '1': true }, true);
  });

  it('should render with search input', () => {
    const { container } = render(<Table data={[]} withSearchInput />);

    const tableFilter = container.querySelector('.table__filter');
    const input = screen.getByPlaceholderText('Pesquisar');

    expect(tableFilter).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
  });

  it('should render expandable table', () => {
    const onRowClick = jest.fn();
    const row = { id: '1', name: 'John Doe' };
    render(
      <Table
        expandedRow="1"
        renderExpandedRow={() => 'Expanded'}
        onRowClick={onRowClick}
        data={[row]}
        showColumnSelector={false}
      >
        <TableColumn fromKey="id" header="Id" />
        <TableColumn fromKey="name" header="Name" />
      </Table>
    );

    const johnCell = screen.getByText('John Doe');
    const johnRow = johnCell.parentElement;
    const expandedCell = screen.getByText('Expanded');
    const expandedRow = expandedCell.parentElement;

    expect(expandedCell).toBeInTheDocument();
    expect(expandedCell).toHaveAttribute('colspan', '3');
    expect(expandedRow).toHaveClass('table__row table__row--expanded');

    fireEvent.click(johnRow as Element);
    expect(onRowClick).toBeCalledWith(row);
  });

  it('should render draggable table', async () => {
    const onDrag = jest.fn();
    const data = [
      {
        id: 1,
        name: 'John Doe',
        email: 'email@mail.com',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'email2@mail.com',
      },
    ];

    const { container } = render(
      <Table
        data={data}
        onDrag={onDrag}
        setDragging={jest.fn()}
        onDragEnd={jest.fn()}
      >
        <TableColumn fromKey="id" header="Id" />
        <TableColumn fromKey="name" header="Name" />
        <TableColumn fromKey="email" header="E-mail" />
      </Table>
    );

    await waitFor(() => {
      return expect(screen.getAllByText('drag_indicator')).toHaveLength(2);
    });

    const draggableRow = container.querySelector('.table__row') as Element;
    const dropZone = container.querySelectorAll('.table__row')[1] as Element;

    fireEvent.mouseDown(draggableRow, { which: 1, button: 0 });
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone);
    fireEvent.mouseUp(dropZone, { which: 1, button: 0 });

    expect(onDrag).toBeCalledWith(1);
  });

  it('should render with loading', () => {
    const { container } = render(<Table isLoading data={[]}></Table>);

    const rows = container.querySelectorAll('.react-loading-skeleton');
    expect(rows).toHaveLength(5);
  });

  it('should render footer with pagination', async () => {
    const setFilters = jest.fn();

    const { container } = render(
      <Table
        filters={{}}
        setFilters={setFilters}
        withPagination
        totalRecords={100}
        isLoading
        data={[]}
      ></Table>
    );

    const tfoot = container.querySelector('tfoot');
    const paginationContainer = container.querySelector(
      '.pagination-container'
    );

    expect(tfoot).toBeInTheDocument();
    expect(paginationContainer).toBeInTheDocument();
  });
});
