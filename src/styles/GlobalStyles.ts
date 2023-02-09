import React from 'react';

import { ThemeOptions } from '@mui/material/styles';

export const globalStyles = (theme: ThemeOptions) => ({
  html: {
    fontSize: '62.5%' /* 62.5% of 16px = 10px */,
  },
  'html, body': {
    height: '100%',
    overflow: 'hidden',
  },
  '#root': {
    height: '100%',
  },
  /* width */
  '::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  /* Track */
  '::-webkit-scrollbar-track': {
    background: theme.palette?.scrollBackground?.main,
  },
  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: theme.palette?.scrollThumb?.main,
    borderRadius: '5px',
  },
  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: theme.palette?.scrollThumbHover?.main,
  },
});
