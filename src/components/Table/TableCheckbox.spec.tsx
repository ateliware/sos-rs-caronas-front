import { fireEvent, render } from '@testing-library/react';

import TableCheckbox from './TableCheckbox';

describe('TableCheckbox', () => {
  it('should render', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCheckbox />
          </tr>
        </tbody>
      </table>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with variants', () => {
    const action = jest.fn();
    const change = jest.fn();
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableCheckbox checked header onAction={action} onChange={change} />
          </tr>
        </thead>
      </table>
    );
    expect(container).toMatchSnapshot();

    const checkbox = container.querySelector('.form-check-input') as Element;
    fireEvent.click(checkbox);
    expect(change).toHaveBeenCalledWith(false);

    const actionBtn = container.querySelector('.btn--table-action') as Element;
    fireEvent.click(actionBtn);
    expect(action).toHaveBeenCalled();
  });
});
