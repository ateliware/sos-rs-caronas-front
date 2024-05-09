import { useForm } from 'react-hook-form';

import {
  ColumnProps,
  Icon,
  Input,
  PopOver,
  PopOverTab,
  RadioButton,
  RadioForm,
  Select,
} from '@components';
import { debounce } from 'lodash';

import TableButton from '../TableButton';

type Props = Pick<
  ColumnProps,
  'setFilters' | 'filters' | 'fromKey' | 'filterType' | 'filterOptions'
>;

const operations = [
  'eq',
  'not',
  'lt',
  'lte',
  'gt',
  'gte',
  'between',
  'in',
  'contains',
];
function parseFilter(value: string) {
  const hasOperation = typeof value === 'string' && value.includes(':');
  const filterIndex = hasOperation ? value.indexOf(':') : -1;
  const [operation, operand] = hasOperation
    ? [value.slice(0, filterIndex), value.slice(filterIndex + 1)]
    : ['contains', value];
  if (operations.includes(operation)) return [operation, operand];
  return ['contains', value];
}

export default function FilterButton(props: Props) {
  const { register, watch, setValue } = useForm();
  const { setFilters, filters, fromKey } = props;
  if (!setFilters || !filters) return null;
  const filter = filters[fromKey];
  const [operation, operand] = parseFilter(filter);
  const filterType = props.filterType ?? '';
  const options = props.filterOptions ?? [];
  let filterContainer;

  if (filterType === 'select')
    filterContainer = (
      <Select
        placeholder="Selecionar..."
        options={options}
        isClearable
        value={watch('filter')}
        onSelect={debounce((e) => {
          setValue('filter', e);
          const newFilters = { ...filters };
          const operand = e?.value ?? false;
          if (!operand) delete newFilters[fromKey];
          else newFilters[fromKey] = operand;
          setFilters(newFilters);
        }, 500)}
        form={register('filter')}
      ></Select>
    );
  else if (['date', 'number'].includes(filterType))
    filterContainer = 'Não implementado';
  else
    filterContainer = (
      <>
        <Input
          placeholder="Buscar..."
          type="search"
          className="pb-s-200"
          form={register('filter', {
            value: operand,
            onChange: debounce((e) => {
              const newFilters = { ...filters };
              const operation = parseFilter(filter)[0];
              const operand = e.target.value;
              if (!operand && operation === 'contains')
                delete newFilters[fromKey];
              else newFilters[fromKey] = `${operation}:${operand}`;
              setFilters(newFilters);
            }, 500),
          })}
        />
        <label htmlFor="operationFilter" className="form-input__label">
          Filtrar por:
        </label>
        <RadioForm
          name="operationFilter"
          form={register('operation', {
            value: operation,
            onChange: debounce((e) => {
              const newFilters = { ...filters };
              const operation = e.target.value;
              const operand = parseFilter(filter)[1] ?? '';
              if (!operand && operation === 'contains')
                delete newFilters[fromKey];
              else newFilters[fromKey] = `${operation}:${operand}`;
              setFilters(newFilters);
            }, 500),
          })}
        >
          <RadioButton label="Texto parcial" value="contains" />
          <RadioButton label="Texto igual" value="eq" />
          <RadioButton label="Texto diferente" value="not" />
        </RadioForm>
      </>
    );

  return (
    <PopOver
      noStyling
      direction="right"
      fixedContent={<TableButton active={!!filter}>filter_list</TableButton>}
      togglableContent={
        <PopOverTab icon={<Icon>search</Icon>} header="Filtrar">
          {filterContainer}
        </PopOverTab>
      }
    />
  );
}
