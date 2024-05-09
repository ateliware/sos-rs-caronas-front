import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useConfirmationModal } from '@hooks/useConfirmationModal';
import { Button } from '@components';

import { ConfirmationModalProvider } from './ConfirmationContext';

describe('renders ConfirmationContext', () => {
  it('renders', () => {
    const ConfirmationStub = () => <>stub test</>;

    render(
      <ConfirmationModalProvider>
        <ConfirmationStub />
      </ConfirmationModalProvider>
    );
  });

  it('opens confirmation modal', async () => {
    const ConfirmationStub = () => {
      const confirmation = useConfirmationModal();

      const actionButton = () => {
        confirmation({
          title: 'title test',
          description: 'description test',
          onSubmit: () => {},
        });
      };

      return (
        <>
          <>stub test</>
          <Button onClick={actionButton}>test button</Button>
        </>
      );
    };

    render(
      <ConfirmationModalProvider>
        <ConfirmationStub />
      </ConfirmationModalProvider>
    );

    const user = userEvent.setup();

    const button = screen.getByText(/test button/i);

    const notFoundTitle = screen.queryByText(/title test/i);

    expect(notFoundTitle).not.toBeInTheDocument();

    await user.click(button);

    const title = screen.queryByText(/title test/i);

    expect(title).toBeInTheDocument();
  });

  it('runs onSubmit properly', async () => {
    const mockOnSubmit = jest.fn();

    const ConfirmationStub = () => {
      const confirmation = useConfirmationModal();

      const actionButton = () => {
        confirmation({
          title: 'title test',
          description: 'description test',
          onSubmit: mockOnSubmit,
          confirmButtonTitle: 'confirm button test',
        });
      };

      return (
        <>
          <>stub test</>
          <Button onClick={actionButton}>test button</Button>
        </>
      );
    };

    render(
      <ConfirmationModalProvider>
        <ConfirmationStub />
      </ConfirmationModalProvider>
    );

    const user = userEvent.setup();
    const button = screen.getByText(/test button/i);
    await user.click(button);

    const confirmButton = screen.getByText(/confirm button test/i);
    await user.click(confirmButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('runs handleClose properly', async () => {
    const mockHandleClose = jest.fn();

    const ConfirmationStub = () => {
      const confirmation = useConfirmationModal();

      const actionButton = () => {
        confirmation({
          title: 'title test',
          description: 'description test',
          onSubmit: () => {},
          handleClose: mockHandleClose,
          cancelButtonTitle: 'cancel button test',
        });
      };

      return (
        <>
          <>stub test</>
          <Button onClick={actionButton}>test button</Button>
        </>
      );
    };

    render(
      <ConfirmationModalProvider>
        <ConfirmationStub />
      </ConfirmationModalProvider>
    );

    const user = userEvent.setup();
    const button = screen.getByText(/test button/i);
    await user.click(button);

    const cancelButton = screen.getByText(/cancel button test/i);
    await user.click(cancelButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
