import React from 'react';

import { useParams } from 'react-router-dom';

import { KanbanBoard } from 'components';

const Project: React.FC = () => {
  const { id } = useParams();
  return <KanbanBoard />;
};

export default Project;
