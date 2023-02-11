import { createContext } from 'react';

import { ConfirmationModalProps } from 'components';

type Props = {
  confirmationModal?: ConfirmationModalProps;
  setConfirmationModal?: React.Dispatch<React.SetStateAction<ConfirmationModalProps>>;
};

export default createContext<Props>({});
