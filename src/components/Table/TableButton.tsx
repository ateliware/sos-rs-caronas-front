import { PropsWithChildren } from 'react';

type Props = {
  active?: boolean;
  onClick?: () => void;
};

export default function TableButton(props: PropsWithChildren<Props>) {
  const buttonClasses = [
    'btn',
    'btn--icon-square',
    'btn--table-action',
    'ml-s-100',
  ];
  if (props.active) buttonClasses.push('btn--table-action--active');

  return (
    <button onClick={props.onClick} className={buttonClasses.join(' ')}>
      <span className="btn__body">
        <span className="btn__body__icon material-symbols-rounded">
          {props.children}
        </span>
      </span>
    </button>
  );
}
