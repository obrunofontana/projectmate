import React from 'react';

import { Box } from '@mui/material';

// import { Container } from './styles';

const PageUnexpected: React.FC = () => {
  return (
    <Box
      height="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Desculpe, algo inesperado aconteceu :(</h1>
    </Box>
  );
};

export default PageUnexpected;
