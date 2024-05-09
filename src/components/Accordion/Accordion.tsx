import { Icon } from '@components/Icon';
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  initiallyOpen?: boolean;
  children?: React.ReactNode;
  onExpand?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  initiallyOpen = false,
  children,
  onExpand,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);

    if (onExpand && !isOpen) {
      onExpand();
    }
  };

  return (
    <>
      <div>
        <div
          className="d-flex justify-between align-items-center p-s-100 pointer border-secondary mb-s-100 w-100"
          onClick={handleToggle}
          style={{
            border: `1px solid`,
          }}
        >
          <span>{title}</span>
          <span data-testid="accordion-icon">
            <Icon className="text-primary">
              {isOpen ? 'expand_less' : 'expand_more'}
            </Icon>
          </span>
        </div>
      </div>
      {isOpen && <div data-testid="accordion-content">{children}</div>}
    </>
  );
};

export default Accordion;
