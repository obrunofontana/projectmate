import React from 'react';

import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const navigateHomeHandler = () => {
    navigate('/', { replace: true });
  };

  return (
    <Box
      height="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img src="404-2.png" alt="Not found image" width={500} />
      <h1>Página não encontrada!</h1>
      <Button onClick={navigateHomeHandler}>Voltar para home</Button>
    </Box>
  );
};

export default PageNotFound;
