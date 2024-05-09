import { fireEvent, render } from '@testing-library/react';

import { TableFooter } from './TableFooter';

describe('TableFooter', () => {
  it('should trigger onPageChange', async () => {
    const setCurrentPage = jest.fn();
    const onPageChange = jest.fn();

    const { container } = render(
      <table>
        <TableFooter
          onPageChange={onPageChange}
          currentPage={1}
          pageCount={10}
          setCurrentPage={setCurrentPage}
        ></TableFooter>
      </table>
    );

    const button = container.querySelectorAll('.pagination-number')[2];

    fireEvent.click(button!);

    expect(onPageChange).toBeCalledTimes(1);
    expect(onPageChange).toBeCalledWith(3);
  });
});
