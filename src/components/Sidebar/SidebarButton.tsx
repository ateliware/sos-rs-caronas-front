import { ReactNode } from 'react';

type Props = {
  active?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
  label?: string;
};

export default function SidebarButton(props: Props) {
  const sidebarButtonClasses = ['sidebutton'];
  if (props.className) sidebarButtonClasses.push(props.className);
  if (props.active) sidebarButtonClasses.push('sidebutton--active');

  return (
    <button className={sidebarButtonClasses.join(' ')} onClick={props.onClick}>
      <div className="sidebutton__icon sidebutton__icon--xs">{props.icon}</div>
      <div className="sidebutton__label sidebutton__label--xs">
        {props.label}
      </div>
    </button>
  );
}
