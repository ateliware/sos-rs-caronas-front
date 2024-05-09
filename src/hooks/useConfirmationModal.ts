import { useContext } from 'react';

import { ConfirmationModalContext } from '@contexts/ConfirmationContext';

export const useConfirmationModal = () => useContext(ConfirmationModalContext);
