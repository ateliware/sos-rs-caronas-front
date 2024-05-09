import { Fragment } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';

import { Icon } from '@components/Icon';

import { SelectedKeys } from './Table';
import TableCheckbox from './TableCheckbox';
import { ColumnProps } from './TableColumn';
import TableColumnCell from './TableColumnCell';

type Props = {
  row: any;
  checkable: boolean;
  dataKey: string;
  selectedKeys: SelectedKeys;
  invertSelection: boolean;
  tableId: string;
  columns: ColumnProps[];
  draggable?: boolean;
  setDragging?: (row: Props['row']) => void;
  onDrag?: (newIndex: number) => void;
  onDragEnd?: () => void;
  onSelectionChange?: (keys: SelectedKeys, invertSelection: boolean) => void;
  setSelectedKeys: (keys: SelectedKeys) => void;
  onClick?: (row: any) => void;
  watch: UseFormWatch<FieldValues>;
  showColumnSelector: boolean;
};

export default function TableRow(props: Props) {
  const rowClasses = ['table__row'];
  const dataKey = props.dataKey;
  const row = props.row;
  const selectedKeys = props.selectedKeys;
  const invertSelection = props.invertSelection;
  if (props.draggable) rowClasses.push('table__row--draggable');

  const dragOver = (e: any) => {
    e.preventDefault();
    const rows = Array.from(e.target.parentNode.parentNode.children);
    const row = e.target.parentNode;
    const newOrder = rows.indexOf(row);

    props?.onDrag?.(newOrder);
  };

  return (
    <tr
      className={rowClasses.join(' ')}
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'DIV') props.onClick?.(row);
      }}
      draggable={props.draggable}
      onDragStart={() => props.setDragging?.(row)}
      onDragOver={props.draggable ? dragOver : undefined}
      onDragEnd={props.draggable ? () => props?.onDragEnd?.() : undefined}
    >
      {props.draggable && (
        <td className="table__cell">
          <div className="table__cell__content d-flex justify-center">
            <Icon>drag_indicator</Icon>
          </div>
        </td>
      )}
      {props.checkable && (
        <TableCheckbox
          checked={(selectedKeys[row[dataKey]] ?? false) !== invertSelection}
          onChange={(checked) => {
            const selected = checked !== invertSelection;
            const newSelectedKeys: SelectedKeys = {
              ...selectedKeys,
              [row[dataKey]]: true,
            };
            if (!selected) delete newSelectedKeys[row[dataKey]];

            props.setSelectedKeys(newSelectedKeys);
            props.onSelectionChange?.(newSelectedKeys, invertSelection);
          }}
        />
      )}
      {props.columns.map((column) => {
        const columnName = column.header?.toString() || '';

        if (
          props.showColumnSelector &&
          !props.watch(columnName, { value: true })
        )
          return <Fragment key={columnName}></Fragment>;

        return (
          <TableColumnCell
            key={props.tableId + column.header + row[dataKey]}
            {...column}
            row={row}
          />
        );
      })}
    </tr>
  );
}
