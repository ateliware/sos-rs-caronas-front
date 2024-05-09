import { pageRange } from './TableHelper';

interface Props {
  currentPage: number;
  pageCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  onPageChange: (page: number) => void;
}

export const TableFooter = (props: Props) => {
  return (
    <tfoot>
      <tr>
        <td>
          <nav className="pagination-container">
            <button
              disabled={props.currentPage === 1}
              onClick={() => {
                props.setCurrentPage(1);
                props.onPageChange!(1);
              }}
              className="pagination-button first"
              id="first-button"
              aria-label="first page"
              title="first page"
            >
              Primeira
            </button>
            <button
              disabled={props.currentPage === 1}
              onClick={() => {
                props.setCurrentPage((p: number) => p - 1);
                props.onPageChange!(props.currentPage - 1);
              }}
              className="pagination-button"
              id="prev-button"
              aria-label="Previous page"
              title="Previous page"
            >
              &lt;
            </button>

            <div id="pagination-numbers">
              {pageRange(props.currentPage, props.pageCount).map((i) => {
                const buttonClassNames = ['pagination-number'];

                if (i === props.currentPage) buttonClassNames.push('active');

                return (
                  <button
                    onClick={() => {
                      props.setCurrentPage(i);
                      props.onPageChange!(i);
                    }}
                    key={i}
                    className={buttonClassNames.join(' ')}
                  >
                    {i}
                  </button>
                );
              })}
            </div>

            <button
              disabled={props.currentPage === props.pageCount}
              onClick={() => {
                props.setCurrentPage((p: number) => p + 1);
                props.onPageChange!(props.currentPage + 1);
              }}
              className="pagination-button"
              id="next-button"
              aria-label="Next page"
              title="Next page"
            >
              &gt;
            </button>
            <button
              disabled={props.currentPage === props.pageCount}
              onClick={() => {
                props.setCurrentPage(props.pageCount);
                props.onPageChange!(props.pageCount);
              }}
              className="pagination-button last"
              id="last-button"
              aria-label="last page"
              title="Last page"
            >
              Última
            </button>
          </nav>
        </td>
      </tr>
    </tfoot>
  );
};
