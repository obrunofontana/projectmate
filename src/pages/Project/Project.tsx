import React from 'react';

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const Project: React.FC = () => {
  const { id } = useParams();
  return (
    <Box>
      <h1>Visualizando projeto com id: {id}</h1>
    </Box>
  );
};

export default Project;
