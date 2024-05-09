import { PropsWithChildren, ReactNode, useId } from 'react';

type Props = {
  open?: boolean;
  className?: string;
  size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  float?: 'left' | 'right';
  overlay?: boolean;
  closable?: boolean;
  header?: ReactNode;
  onClickAway?: () => void;
};

export default function Drawer(props: PropsWithChildren<Props>) {
  const id = useId();
  const overlay = props.overlay ?? true;
  const drawerClasses = ['drawer', `drawer--${props.size ?? 'md'}`];
  const drawerOverlayClasses = ['drawer__overlay'];
  if (props.className) drawerClasses.push(props.className);
  if (props.open) drawerClasses.push('drawer--open');
  if (props.open) drawerOverlayClasses.push('drawer__overlay--open');
  drawerClasses.push(`drawer--${props.float ?? 'right'}`);

  return (
    <>
      <aside className={drawerClasses.join(' ')} id={`drawer-${id}`}>
        {props.header}
        {props.closable && (
          <button
            className="drawer__close"
            onClick={props.onClickAway}
            aria-label="Close drawer"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        )}
        {props.children}
      </aside>
      {overlay && (
        <div
          onClick={props.closable ? props.onClickAway : undefined}
          className={drawerOverlayClasses.join(' ')}
          id={`drawer-overlay-${id}`}
        ></div>
      )}
    </>
  );
}
