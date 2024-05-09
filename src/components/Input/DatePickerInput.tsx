import { DayPicker } from 'react-day-picker';

import { Icon } from '../Icon';
import { PopOver } from '../PopOver';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import 'react-day-picker/dist/style.css';

import Input, { Props as InputProps } from './Input';

export type Props = {
  onSelect: (date: String) => void;
  dateSelected: string;
  position?: 'top' | 'bottom';
};

export default function DatePickerInput(props: InputProps & Props) {
  return (
    <>
      <Input
        mask="date"
        suffixes={
          <PopOver
            position={props.position}
            fixedContent={
              <div className="pr-s-100 m-s-50 mt-s-100">
                <Icon>calendar_month</Icon>
              </div>
            }
            togglableContent={
              <div className="popover-menu">
                <DayPicker
                  locale={ptBR}
                  mode="single"
                  selected={parse(props.dateSelected, 'dd/MM/yyyy', 0)}
                  onSelect={(date) => {
                    if (date) props.onSelect(format(date, 'dd/MM/yyyy'));
                  }}
                />
              </div>
            }
          />
        }
        {...props}
      />
    </>
  );
}
