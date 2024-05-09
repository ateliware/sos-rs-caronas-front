import { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  color?: string;
  className?: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  inverted?: boolean;
  outlined?: boolean;
  prefixes?: ReactNode;
  suffixes?: ReactNode;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: (params: any) => void;
}>;

function chipBody(props: Props) {
  return (
    <div className="chip__body">
      {props.prefixes}
      <div className="chip__body__text">{props.children}</div>
      {props.suffixes}
    </div>
  );
}

function spanChip(className: string, props: Props) {
  return <span className={className}>{chipBody(props)}</span>;
}

function anchorChip(className: string, props: Props) {
  return (
    <a href={props.href} target={props.target} className={className}>
      {chipBody(props)}
    </a>
  );
}

function buttonChip(className: string, props: Props) {
  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault();
        props.onClick?.(props.children);
      }}
      disabled={props.disabled}
    >
      {chipBody(props)}
    </button>
  );
}

export default function Chip(props: Props) {
  const chipClasses = ['chip'];
  chipClasses.push(`chip--${props.color ?? 'primary'}`);
  chipClasses.push(`chip--${props.size ?? 'medium'}`);
  if (props.className) chipClasses.push(props.className);
  if (props.disabled) chipClasses.push('chip--disabled');
  if (props.inverted) chipClasses.push('chip--inverted');
  if (props.outlined) chipClasses.push('chip--outlined');
  const chipClass = chipClasses.join(' ');

  if (props.href) return anchorChip(chipClass, props);
  else if (props.onClick) return buttonChip(chipClass, props);
  else return spanChip(chipClass, props);
}
