import { styled, Card } from '@mui/material';

export const CardContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette?.componentsBackground?.main,
  width: '24rem',
  minWidth: '24rem',
  height: '14.6rem',
  margin: '0.7rem 0',
  marginRight: '1rem',
  padding: '1.2rem 1rem 0.7rem 1rem',
  borderRadius: '0.5rem',
  display: 'inline-block',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  cursor: 'pointer',
}));
