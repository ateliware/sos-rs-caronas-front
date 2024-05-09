import { ReactNode, createContext, useRef, useState } from 'react';

import { Button, Modal } from '@components';

interface ConfirmationOptions {
  title: string;
  description: string | ReactNode;
  handleClose?: () => void;
  onSubmit: () => void;
  cancelButtonTitle?: string;
  confirmButtonTitle?: string;
  modalSize?: 'small' | 'medium' | 'large';
}

export const ConfirmationModalContext = createContext<
  (options: ConfirmationOptions) => Promise<void>
>(Promise.resolve);

export const ConfirmationModalProvider = ({ children }: any) => {
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationOptions | null>(null);

  const awaitingPromiseRef = useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openConfirmation = async (options: ConfirmationOptions) => {
    setConfirmationState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (confirmationState?.handleClose) {
      confirmationState.handleClose();
    }

    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmationModalContext.Provider
        value={openConfirmation}
        children={children}
      />

      {confirmationState && (
        <Modal
          isOpen={Boolean(confirmationState)}
          onClickAway={handleClose}
          title={confirmationState.title}
          size={confirmationState.modalSize}
        >
          <div className="container p-s-200">
            <div className="p-s-200">{confirmationState.description}</div>
            <div className="row justify-end pt-s-400" style={{ gap: 16 }}>
              <Button design="transparent" onClick={handleClose}>
                {confirmationState.cancelButtonTitle || 'Cancelar'}
              </Button>
              <Button
                className="confirmation-confirm-button"
                onClick={() => {
                  confirmationState.onSubmit();
                  setConfirmationState(null);
                }}
              >
                {confirmationState.confirmButtonTitle || 'Salvar'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
