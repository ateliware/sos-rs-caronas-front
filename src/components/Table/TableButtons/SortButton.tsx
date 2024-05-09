import { ColumnProps } from '@components';

import TableButton from '../TableButton';

const Orders = {
  asc: 'asc',
  desc: 'desc',
} as const;

export default function SortButton(
  props: Pick<ColumnProps, 'setFilters' | 'filters' | 'fromKey'>
) {
  const { setFilters, filters, fromKey } = props;
  if (!setFilters || !filters) return null;
  const orders = (filters?.order ?? '').split(',').filter((o) => o);
  const orderIndex = orders.findIndex(
    (o) => o === fromKey || o === `-${fromKey}`
  );
  const order = orders[orderIndex];
  const direction = order?.startsWith('-') ? Orders.desc : Orders.asc;
  const icon = direction === Orders.asc ? 'arrow_drop_up' : 'arrow_drop_down';

  return (
    <TableButton
      active={!!order}
      onClick={() => {
        if (order && direction === Orders.asc)
          orders[orderIndex] = `-${fromKey}`;
        else if (order && direction === Orders.desc)
          orders.splice(orderIndex, 1);
        else orders.push(fromKey);
        const hasOrder = orders.findIndex((o) => o.includes('order'));
        if (hasOrder !== -1) {
          orders.splice(hasOrder, 1);
          orders.push('order');
        }
        setFilters({ ...filters, order: orders.join(',') });
      }}
    >
      {icon}
    </TableButton>
  );
}
