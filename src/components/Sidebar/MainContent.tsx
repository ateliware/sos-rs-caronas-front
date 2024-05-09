import { PropsWithChildren } from 'react';

type Props = {
  collapsed?: boolean;
  className?: string;
};

export default function MainContent(props: PropsWithChildren<Props>) {
  const size = props.collapsed ? 'none' : 'md';
  const mainContentClasses = ['main__content', `main__content--${size}`];
  if (props.className) mainContentClasses.push(props.className);

  return <main className={mainContentClasses.join(' ')}>{props.children}</main>;
}
