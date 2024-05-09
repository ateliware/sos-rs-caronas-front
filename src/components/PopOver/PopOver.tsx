import { useState } from 'react';

type Props = {
  fixedContent: JSX.Element;
  togglableContent: JSX.Element;
  noStyling?: boolean;
  direction?: 'left' | 'right';
  position?: 'top' | 'bottom';
};

function PopOver(props: Props) {
  const [showTogglableContent, setShowTogglableContent] = useState(false);

  function handleMouseEnter() {
    setShowTogglableContent(true);
  }

  function handleMouseLeave() {
    setShowTogglableContent(false);
  }

  const fixedContentClasses = [
    'd-flex',
    'align-items-center',
    'justify-center',
    'pl-s-300',
    'pr-s-100',
  ];

  return (
    <div
      className="popover-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="popover-trigger">
        <div className={props.noStyling ? '' : fixedContentClasses.join(' ')}>
          {props.fixedContent}
        </div>
      </div>
      {showTogglableContent && (
        <div
          style={{
            top: props.position === 'top' ? -300 : 0,
            right: props.direction === 'right' ? 'auto' : 0,
          }}
          className="popover-content"
        >
          {props.togglableContent}
        </div>
      )}
    </div>
  );
}

export default PopOver;
