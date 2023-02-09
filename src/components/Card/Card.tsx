import React from 'react';

import { CardContainer } from './CardStyles';

type CardProps = {
  project?: string;
};

const Card: React.FC<CardProps> = ({ project }) => {
  return (
    <CardContainer>
      <span>{project}</span>
    </CardContainer>
  );
};

export default Card;
