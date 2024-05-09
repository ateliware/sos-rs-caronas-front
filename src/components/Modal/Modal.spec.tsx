import { useState } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Modal from './Modal';

describe('Modal', () => {
  it('renders closed modal, opens and closes it', () => {
    function TestModal() {
      const [isOpen, toggle] = useState(false);

      return (
        <>
          <button onClick={() => toggle(!isOpen)}>Open modal</button>
          <Modal isOpen={isOpen} onClickAway={() => toggle(!isOpen)}>
            Test
          </Modal>
        </>
      );
    }

    render(<TestModal />);

    const notModal = screen.queryAllByText('Test');
    expect(notModal).toStrictEqual([]);

    const openButton = screen.getByText('Open modal');
    fireEvent.click(openButton);

    const modal = screen.getByText('Test');
    const overlay = modal.parentElement;

    expect(modal).toBeVisible();
    expect(modal).toHaveClass('modal-box');
    expect(overlay).toHaveClass('modal-overlay');

    const closeButton = screen.getByText('close');
    fireEvent.click(closeButton);
    expect(modal).not.toBeVisible();
  });
});
