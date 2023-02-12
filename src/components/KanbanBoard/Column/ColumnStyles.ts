import { Box, styled } from '@mui/material';

type ContainerProps = {
  isFirstColumn?: boolean;
};

export const Container = styled(Box, {
  shouldForwardProp: (props) => props !== 'isFirstColumn',
})<ContainerProps>(({ isFirstColumn }) => ({
  marginLeft: isFirstColumn ? '0rem' : '0.5rem',
  // backgroundColor: '#ccc',
  padding: '0.5rem',
  borderRadius: '0.5rem',
}));

export const TaskList = styled(Box)(() => ({
  marginTop: '0.5rem',
  height: '72vh',
  overflowY: 'auto',
  overflowX: 'hidden',
}));
