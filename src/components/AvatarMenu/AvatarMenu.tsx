import React, { useEffect, useState } from 'react';

import {
  AccountBox as AccountBoxIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';
import { Menu, MenuItem, Avatar, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector } from 'store';
import { useLogoutUserMutation } from 'store/api/authApi';

const AvatarMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onLogoutHandler = async () => {
    setAnchorEl(null);
    logoutUser();
  };

  const onViewProfileHandler = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const onAdminPanelHandler = () => {
    navigate('/admin');
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="text"
        aria-controls={open ? 'avatar-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ marginRight: '1rem', color: (theme) => theme.palette.text.primary }}
        onClick={handleClick}
      >
        <Avatar sx={{ marginRight: '1rem' }} src="https://randomuser.me/portraits/men/71.jpg" />
        <strong>{user?.name}</strong>
      </Button>

      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={onViewProfileHandler}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Meu perfil</ListItemText>
        </MenuItem>

        {user && user?.role === 'admin' && (
          <MenuItem onClick={onAdminPanelHandler}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Painel do administrador</ListItemText>
          </MenuItem>
        )}

        <MenuItem onClick={onLogoutHandler}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
