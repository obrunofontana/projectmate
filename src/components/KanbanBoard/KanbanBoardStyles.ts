import { Box, styled } from '@mui/material';

export const ColumnsContainer = styled(Box)(() => ({
  paddingTop: '1rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '1.5rem',
  maxWidth: '100vw',
  overflowX: 'auto',
}));
