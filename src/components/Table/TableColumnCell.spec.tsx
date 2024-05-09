import { render } from '@testing-library/react';

import TableColumnCell from './TableColumnCell';

describe('TableColumnCell', () => {
  it('should render', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableColumnCell
              fromKey="name"
              header="Name"
              row={{ name: 'John' }}
            />
          </tr>
        </tbody>
      </table>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <table>
          <tbody>
            <tr>
              <td
                class="table__cell"
              >
                John
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `);
  });

  it('should render with variants', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableColumnCell
              fromKey="name"
              header="Name"
              row={{ name: 'John' }}
              ellipsis
              textAlign="right"
              verticalAlign="middle"
              cellAlign="center"
              render={(value) => 'hi ' + value}
            />
          </tr>
        </tbody>
      </table>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <table>
          <tbody>
            <tr>
              <td
                class="table__cell table__cell--ellipsis !text-right !valign-middle"
              >
                hi John
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `);
  });
});
