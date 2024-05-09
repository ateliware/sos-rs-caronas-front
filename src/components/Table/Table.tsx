import React, { Fragment, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { RepositoryParams } from '@services/api';
import { debounce } from 'lodash';

import { Input, InputAddon, InputIcon } from '@components';

import TableCheckbox from './TableCheckbox';
import TableColumn, { ColumnProps } from './TableColumn';
import { TableFooter } from './TableFooter';
import TableRow from './TableRow';
import TableShowColumnSelector from './TableShowColumnSelector';

type Row = { [key: string]: any };
export type Filters = { [key: string]: any } & Partial<RepositoryParams>;

type Props = {
  className?: string;
  dataKey?: string;
  data: Row[];
  checkable?: boolean;
  hoverable?: boolean;
  layout?: 'fixed' | 'auto';
  rowPadding?: 'small' | 'medium' | 'large';
  children?: React.ReactElement<ColumnProps>[];
  selectedKeys?: SelectedKeys;
  invertSelection?: boolean;
  expandedRow?: string;
  isLoading?: boolean;
  withSearchInput?: boolean;
  withPagination?: boolean;
  filters?: Filters;
  setDragging?: React.Dispatch<React.SetStateAction<any>>;
  setFilters?: React.Dispatch<React.SetStateAction<Filters>>;
  onDrag?: (newIndex: number) => void;
  onDragEnd?: () => void;
  renderExpandedRow?: (row: any) => React.ReactNode;
  onAction?: (keys: SelectedKeys, invertSelection: boolean) => void;
  onSelectionChange?: (keys: SelectedKeys, invertSelection: boolean) => void;
  onRowClick?: (row: Row) => void;
  totalRecords?: number;
  showColumnSelector?: boolean;
};

export type SelectedKeys = { [key: string]: boolean };

export default function Table({ showColumnSelector = true, ...props }: Props) {
  const totalRecords = props.totalRecords || 0;

  const id = useId();
  const dataKey = props.dataKey ?? 'id';
  const tableClasses = ['table'];
  if (props.layout === 'fixed') tableClasses.push('table--fixed');
  if (props.hoverable) tableClasses.push('table--hoverable');
  if (props.className) tableClasses.push(props.className);
  if (props.rowPadding) tableClasses.push(`table--py-${props.rowPadding}`);
  const columns = props.children?.map((child) => child.props) || [];
  const [selectedKeys, setSelectedKeys] = useState<SelectedKeys>(
    props.selectedKeys ?? {}
  );
  const [invertSelection, setInvertSelect] = useState(
    props.invertSelection ?? false
  );
  const [currentPage, setCurrentPage] = useState(1);

  const paginationLimit = 10;
  const pageCount = Math.ceil(totalRecords / paginationLimit);

  const listFilter = debounce((query) => {
    return props.setFilters?.({ ...props.filters, q: query });
  }, 500);

  const { watch, register, setValue } = useForm();

  const data = props.data ?? [];
  return (
    <>
      <div className="table__filter col-md-12">
        <div className="d-flex justify-between">
          {props.withSearchInput && (
            <div className="col-md-10">
              <Input
                className="w-50"
                type="search"
                placeholder="Pesquisar"
                form={register('search', {
                  onChange: (e) => {
                    listFilter(e.target.value);
                  },
                })}
                prefixes={
                  <InputAddon left>
                    <InputIcon>search</InputIcon>
                  </InputAddon>
                }
              />
            </div>
          )}

          {showColumnSelector && (
            <TableShowColumnSelector
              watch={watch}
              setValue={setValue}
              register={register}
              columns={columns}
            />
          )}
        </div>
      </div>

      <table id={id} className={tableClasses.join(' ')}>
        <thead className="table__head">
          <tr className="table__row">
            {props.onDragEnd && (
              <TableColumn
                width="1px"
                headerAlign="center"
                fromKey="id"
                header="Ordem"
              />
            )}
            {props.checkable && (
              <TableCheckbox
                header
                onChange={() => {
                  setSelectedKeys({});
                  setInvertSelect(!invertSelection);
                  props.onSelectionChange?.({}, !invertSelection);
                }}
                onAction={
                  props.onAction &&
                  (() => props.onAction?.(selectedKeys, invertSelection))
                }
              />
            )}
            {React.Children.map(props.children, (child) => {
              const columnName = child!.props.header?.toString() || '';

              if (
                !showColumnSelector ||
                (showColumnSelector && watch(columnName, { value: true }))
              ) {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    filters: props.filters,
                    setFilters: props.setFilters,
                  });
                }

                return child;
              }
            })}
          </tr>
        </thead>
        <tbody className="table__body">
          {props.isLoading ? (
            <tr>
              <td colSpan={columns.length}>
                <Skeleton
                  count={5}
                  height={60}
                  style={{ marginTop: 10, zIndex: 0 }}
                />
              </td>
            </tr>
          ) : (
            data.map((row) => {
              return (
                <Fragment key={id + row[dataKey]}>
                  <TableRow
                    tableId={id}
                    columns={columns}
                    row={row}
                    checkable={props.checkable ?? false}
                    dataKey={dataKey}
                    selectedKeys={selectedKeys}
                    invertSelection={invertSelection}
                    onSelectionChange={props.onSelectionChange}
                    setSelectedKeys={setSelectedKeys}
                    onClick={props.onRowClick}
                    setDragging={props.setDragging}
                    onDrag={props.onDrag}
                    onDragEnd={props.onDragEnd}
                    draggable={!!props.onDragEnd}
                    watch={watch}
                    showColumnSelector={showColumnSelector}
                  />
                  {props.expandedRow && row[dataKey] === props.expandedRow && (
                    <tr className="table__row table__row--expanded">
                      <td colSpan={columns.length + 1}>
                        {props.renderExpandedRow?.(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })
          )}
        </tbody>
        {props.withPagination && (
          <TableFooter
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
            onPageChange={(page) =>
              props.setFilters?.({ ...props.filters, page })
            }
          />
        )}
      </table>
    </>
  );
}
