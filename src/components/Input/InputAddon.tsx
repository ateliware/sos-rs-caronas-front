import { PropsWithChildren } from 'react';

type Props = {
  left?: boolean;
  center?: boolean;
  right?: boolean;
};

export function getDirection({
  left,
  right,
  center,
}: Pick<Props, 'left' | 'right' | 'center'>): string {
  return left ? '--left' : right ? '--right' : center ? '--center' : '';
}

export default function InputAddon(props: PropsWithChildren<Props>) {
  const direction = getDirection(props);

  return (
    <div
      className={
        'form-input__addons__wrapper form-input__addons__wrapper' + direction
      }
    >
      {typeof props.children === 'string' ? (
        <span className={'form-input__addons__text'}>{props.children}</span>
      ) : (
        props.children
      )}
    </div>
  );
}
