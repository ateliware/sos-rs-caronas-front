import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  header: ReactNode;
};

export default function PopOverTab(props: PropsWithChildren<Props>) {
  return (
    <div className="popover-tab">
      <div className="popover-tab__header">
        <div className="popover-tab__header__icon">{props.icon}</div>
        {props.header}
      </div>
      <div className="popover-tab__body">{props.children}</div>
    </div>
  );
}
