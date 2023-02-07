import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AvatarMenu from 'components/AvatarMenu/AvatarMenu';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            ProjectMate
          </Typography>

          <Box display="flex" sx={{ ml: 'auto' }}>
            <Box sx={{ ml: 4 }}>
              <AvatarMenu />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
