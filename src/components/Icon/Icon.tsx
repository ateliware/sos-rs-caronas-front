import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
  type?: 'material';
  className?: string;
}>;

function iconType(iconType: Props['type']) {
  const type = iconType ?? 'material';
  const types = { material: 'material-symbols-rounded' };
  return types[type];
}

export default function Icon(props: Props) {
  const iconClasses = [iconType(props.type)];
  if (props.className) iconClasses.push(props.className);

  return <span className={iconClasses.join(' ')}>{props.children}</span>;
}
