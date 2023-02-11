import React, { useContext } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { ApplicationContext } from 'contexts';

export type ConfirmationModalProps = {
  id?: string;
  keepMounted?: boolean;
  open?: boolean;
  onChoose?: (isConfirm: boolean) => void;
  title?: string;
  messageText?: string;
  cancelButtonLabel?: string;
  okButtonLabel?: string;
  loading?: boolean;
};

const ConfirmationModal: React.FC = () => {
  const { confirmationModal } = useContext(ApplicationContext);

  if (!confirmationModal) {
    return null;
  }

  const {
    onChoose,
    open = false,
    title = 'Confirmação',
    cancelButtonLabel = 'Não',
    okButtonLabel = 'Sim',
    loading = false,
    messageText,
    ...other
  } = confirmationModal;

  const handleCancel = () => {
    if (onChoose) onChoose(false);
  };

  const handleOk = () => {
    if (onChoose) onChoose(true);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        dividers
        sx={{
          textAlign: loading ? 'center' : 'inherit',
        }}
      >
        {loading ? <CircularProgress /> : <DialogContentText>{messageText}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={loading}>
          {cancelButtonLabel}
        </Button>
        <Button onClick={handleOk} disabled={loading}>
          {okButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
