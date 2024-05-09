import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Table from './Table';
import TableColumn from './TableColumn';

describe('showColumnSelector', () => {
  it('should render all columns then remove one of them', async () => {
    const user = userEvent.setup();

    const data = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@ateliware.com',
      },
    ];

    const { container } = await waitFor(() => {
      return render(
        <Table data={data} showColumnSelector={true}>
          <TableColumn fromKey="id" header="Id" />
          <TableColumn fromKey="name" header="Name" />
          <TableColumn fromKey="email" header="E-mail" />
        </Table>
      );
    });

    let rowsHead = container.querySelectorAll('thead tr');
    expect(rowsHead).toHaveLength(1);

    let rowsBody = container.querySelectorAll('tbody tr');
    expect(rowsBody).toHaveLength(1);

    let columnsBody = rowsBody[0].querySelectorAll('td');
    expect(columnsBody).toHaveLength(3);

    let columnsHead = rowsHead[0].querySelectorAll('th');
    await waitFor(() => {
      expect(columnsHead).toHaveLength(3);
    });

    const showColumnSelectorIcon = container.querySelector(
      '.showColumnSelector'
    );

    expect(showColumnSelectorIcon).toBeInTheDocument();
    await user.hover(showColumnSelectorIcon!);

    const idSwitch = document.querySelectorAll('label');

    fireEvent.click(idSwitch[0]);

    rowsBody = container.querySelectorAll('tbody tr');
    columnsBody = rowsBody[0].querySelectorAll('td');
    expect(columnsBody).toHaveLength(2);

    rowsHead = container.querySelectorAll('thead tr');
    columnsHead = rowsHead[0].querySelectorAll('th');
    expect(columnsHead).toHaveLength(2);
  });
});
