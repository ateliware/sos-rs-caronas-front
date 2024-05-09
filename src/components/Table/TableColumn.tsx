import { ReactNode } from 'react';

import TableButton from './TableButton';
import { Filters } from './Table';
import { FilterButton, SortButton } from './TableButtons';

type CellProps = {
  container?: boolean;
  ellipsis?: boolean;
  cellAlign?: 'start' | 'end' | 'center' | 'between';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  textAlign?: 'left' | 'center' | 'right';
  render?: (value: any, rowData: any) => ReactNode;
};

export type ColumnProps = {
  fromKey: string;
  header: ReactNode;
  headerAlign?: 'start' | 'end' | 'center' | 'between';
  disableSorting?: boolean;
  filterType?: 'text' | 'number' | 'date' | 'select';
  filterOptions?: { label: string; value: string | boolean | number }[];
  onAction?: (key: string) => void;
  setFilters?: React.Dispatch<React.SetStateAction<Filters>>;
  filters?: Filters;
  width?: string;
  className?: string;
} & CellProps;

export default function TableColumn(props: ColumnProps) {
  const key = props.fromKey;
  const thClassName = ['table__cell'];
  const thCellContentClassName = ['table__cell__content'];

  if (props.className) {
    thClassName.push(props.className);
  }

  if (props.headerAlign) {
    thCellContentClassName.push(`justify-${props.headerAlign}`);
    thCellContentClassName.push(`text-${props.headerAlign}`);
  }

  return (
    <th style={{ width: props.width }} className={thClassName.join(' ')}>
      <div className={thCellContentClassName.join(' ')}>
        {props.header}
        {!props.disableSorting && <SortButton {...props} />}
        {props.filterType && <FilterButton {...props} />}
        {props.onAction && (
          <TableButton onClick={() => props.onAction?.(key)}>
            more_horiz
          </TableButton>
        )}
      </div>
    </th>
  );
}
