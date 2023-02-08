import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AvatarMenu from 'components/AvatarMenu/AvatarMenu';
import SwitchTheme from 'components/SwitchTheme/SwitchTheme';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            ProjectMate
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AvatarMenu />
            <SwitchTheme />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
