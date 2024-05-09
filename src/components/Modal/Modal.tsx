import { PropsWithChildren, useId } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  isOpen: boolean;
  onClickAway: () => void;
  size: 'extra-small' | 'small' | 'medium' | 'large';
  title?: string;
  closeClickOutside?: boolean;
}>;

export default function Modal(props: Props) {
  const { closeClickOutside = true } = props;

  const id = useId();
  const modalClassName = ['modal-box'];
  if (props.className) modalClassName.push(props.className);
  modalClassName.push(`modal-size-${props.size}`);

  return (
    <>
      {props.isOpen && (
        <div
          id={`modal-${id}`}
          className="modal-overlay"
          onMouseDown={(e) => {
            (e.target as Element)?.id === `modal-${id}` &&
              closeClickOutside &&
              props.onClickAway();
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={modalClassName.join(' ')}
          >
            <div className="d-flex row justify-between align-items-center mb-s-200">
              <span className="font-s-250">{props.title}</span>
              <div className="modal-close">
                <div
                  className="material-symbols-rounded"
                  onClick={props.onClickAway}
                >
                  close
                </div>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

Modal.defaultProps = {
  size: 'small',
};
