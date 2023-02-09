import { Box, styled, Divider } from '@mui/material';

export const ProjectListContainer = styled(Box)(() => ({
  width: '100%',
  height: '18rem',
  marginBottom: '3rem',
}));

export const ProjectListContainerContent = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  overflow: 'auto',
  whiteSpace: 'nowrap',
  alignItems: 'center',
}));

export const Separator = styled(Divider)(() => ({
  width: '100%',
  borderColor: '#ccc',
  marginTop: '0.5rem',
}));
