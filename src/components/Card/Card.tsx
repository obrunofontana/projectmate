import React, { ReactNode } from 'react';

import { CardContainer } from './CardStyles';

type CardProps = {
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
