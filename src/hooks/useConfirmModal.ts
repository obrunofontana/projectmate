import { useContext, useEffect, useState } from 'react';

import { ConfirmationModalProps } from '../components';
import { ApplicationContext } from '../contexts';

export const useConfirmModal = () => {
  const { setConfirmationModal, confirmationModal } = useContext(ApplicationContext);
  const [confirmModalLoading, setConfirmModalLoading] = useState<boolean | null>(null);

  useEffect(() => {
    if (confirmModalLoading === null) {
      return;
    }

    if (setConfirmationModal) {
      setConfirmationModal((prev) => ({
        ...prev,
        loading: confirmModalLoading,
      }));
    }
  }, [confirmModalLoading, setConfirmationModal, confirmationModal]);

  const openDialog = (props: ConfirmationModalProps) => {
    if (setConfirmationModal) {
      setConfirmationModal({ ...props, open: true });
    }
  };

  const closeDialog = () => {
    if (setConfirmationModal) {
      setConfirmationModal({
        open: false,
      });
    }
  };

  return { openDialog, setConfirmModalLoading, closeDialog };
};
