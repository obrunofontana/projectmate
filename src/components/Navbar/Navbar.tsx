import { useEffect } from 'react';

import { LoadingButton as _LoadingButton } from '@mui/lab';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector } from 'store';
import { useLogoutUserMutation } from 'store/api/authApi';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);

  const [logoutUser, { isLoading, isSuccess, error, isError }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          }),
        );
      } else {
        const err = (error as any)?.data?.message
          ? (error as any)?.data?.message
          : (error as any)?.error;
        toast.error(err, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onLogoutHandler = async () => {
    console.log('chamou logout ... ');
    logoutUser();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            ProjectMate
          </Typography>
          <Box display="flex" sx={{ ml: 'auto' }}>
            {!user && (
              <>
                <LoadingButton sx={{ mr: 2 }} onClick={() => navigate('/register')}>
                  Inscrever-se
                </LoadingButton>
                <LoadingButton onClick={() => navigate('/sign-in')}>Acessar</LoadingButton>
              </>
            )}
            {user && (
              <LoadingButton
                sx={{ backgroundColor: '#eee' }}
                onClick={onLogoutHandler}
                loading={isLoading}
              >
                Sair
              </LoadingButton>
            )}
            {user && user?.role === 'admin' && (
              <LoadingButton
                sx={{ backgroundColor: '#eee', ml: 2 }}
                onClick={() => navigate('/admin')}
              >
                Admin
              </LoadingButton>
            )}
            <Box sx={{ ml: 4 }}>
              <Tooltip title="Meu perfil" onClick={() => navigate('/profile')}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={user?.name} src="https://randomuser.me/portraits/men/99.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
