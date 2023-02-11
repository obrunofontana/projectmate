import React, { ReactNode } from 'react';

import { CardProps as MuiCardProps } from '@mui/material';

import { CardBorder, CardContainer } from './CardStyles';

interface CardProps extends MuiCardProps {
  borderColor: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, borderColor, ...props }) => {
  return (
    <CardContainer {...props}>
      <CardBorder color={borderColor} />
      {children}
    </CardContainer>
  );
};

export default Card;
