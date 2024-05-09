import { Fragment } from 'react';

type MenuItem = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  content: React.ReactNode;
  show?: boolean;
};

type Props = {
  menu: MenuItem[];
};

export default function PopOverMenu({ menu }: Props) {
  return (
    <div className="popover-menu">
      {menu.map((m, index) => {
        if (m.show === false) return <Fragment key={index}></Fragment>;
        return (
          <div className="item" key={index} onClick={m.onClick}>
            {m.content}
          </div>
        );
      })}
    </div>
  );
}
