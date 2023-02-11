import React, { ReactNode } from 'react';

import { CardBorder, CardContainer } from './CardStyles';

type CardProps = {
  borderColor: string;
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children, borderColor }) => {
  return (
    <CardContainer>
      <CardBorder color={borderColor} />
      {children}
    </CardContainer>
  );
};

export default Card;
