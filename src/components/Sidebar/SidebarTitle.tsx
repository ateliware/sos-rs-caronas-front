import { PropsWithChildren } from 'react';

export default function SidebarTitle(props: PropsWithChildren) {
  return <h3 className="sidebar__title">{props.children}</h3>;
}
