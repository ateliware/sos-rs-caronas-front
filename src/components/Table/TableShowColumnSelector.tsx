import { ChangeEvent } from 'react';
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import { Icon } from '@components/Icon';
import { PopOver, PopOverMenu } from '@components/PopOver';
import { Switch } from '@components/Switch';

import { ColumnProps } from './TableColumn';

interface Props {
  columns: ColumnProps[];
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export default function TableShowColumnSelector(props: Props) {
  const menus = [];

  for (let column of props.columns) {
    if (column.header) {
      const header = column.header?.toString() || '';
      menus.push({
        onClick: (event: ChangeEvent<EventTarget>) => {
          if ((event.target as HTMLInputElement).tagName === 'LABEL') {
            event.preventDefault();
          }

          props.setValue(header, !props.watch(header));
        },
        content: (
          <Switch
            label={header}
            form={props.register(header, { value: true })}
          />
        ),
      });
    }
  }

  return (
    <PopOver
      fixedContent={
        <div
          className="showColumnSelector d-flex align-items-center"
          title="Exibir colunas"
        >
          <Icon>visibility</Icon>
          <span className="ml-s-100">Colunas</span>
        </div>
      }
      togglableContent={<PopOverMenu menu={menus} />}
    />
  );
}
