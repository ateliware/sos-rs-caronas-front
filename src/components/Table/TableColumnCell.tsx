import { ColumnProps } from './TableColumn';

export default function TableColumnCell(props: ColumnProps & { row: any }) {
  const cellClasses = ['table__cell'];
  const cellContentClasses = ['table__cell__content'];
  if (props.ellipsis) cellClasses.push('table__cell--ellipsis');
  if (props.textAlign) cellClasses.push(`!text-${props.textAlign}`);
  if (props.verticalAlign) cellClasses.push(`!valign-${props.verticalAlign}`);
  if (props.cellAlign)
    cellContentClasses.push(`d-flex justify-${props.cellAlign}`);
  const row = props.row;
  const fromKey = props.fromKey;
  const content = props.render ? props.render(row[fromKey], row) : row[fromKey];

  return (
    <td className={cellClasses.join(' ')}>
      {(props.container && (
        <div className={cellContentClasses.join(' ')}>{content || '-'}</div>
      )) ||
        content ||
        '-'}
    </td>
  );
}
