import React, { useState, ReactNode } from 'react';

import { ApplicationContext } from 'contexts';

import { ConfirmationModalProps } from '../ConfirmationModal/ConfirmationModal';

type Props = {
  children: ReactNode;
};

const ApplicationContextContainer: React.FC<Props> = ({ children }) => {
  const [confirmationModal, setConfirmationModal] = useState<ConfirmationModalProps>({});

  return (
    <ApplicationContext.Provider
      value={{
        confirmationModal,
        setConfirmationModal,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextContainer;
