import React from 'react';

import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props extends DialogProps {
  onClose?: () => void;
  onOk?: () => void;
  title?: string;
  disableBackDropClose?: boolean;
  disableEscClose?: boolean;
  contentProps?: DialogContentProps;
  cancelButtonLabel?: string;
  okButtonLabel?: string;
}

const Modal: React.FC<Props> = ({
  onClose,
  onOk,
  title,
  open,
  disableBackDropClose,
  disableEscClose,
  children,
  contentProps,
  cancelButtonLabel = 'Cancelar',
  okButtonLabel = 'Salvar',
  ...props
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose = (event: object, reason: string) => {
    if (disableBackDropClose && reason === 'backdropClick') {
      return;
    }

    if (disableEscClose && reason === 'escapeKeyDown') {
      return;
    }

    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  const handleOk = () => {
    if (onOk) onOk();
    if (onClose) onClose();
  };

  return (
    <MuiDialog fullScreen={fullScreen} onClose={handleClose} open={open} {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent sx={{ display: 'flex' }} {...contentProps}>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>{cancelButtonLabel}</Button>

        <Button variant="contained" onClick={handleOk} autoFocus>
          {okButtonLabel}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Modal;
