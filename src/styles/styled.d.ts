import React from 'react';

declare module '@mui/material/styles' {
  interface ThemeOptions {
    palette: {
      scrollBackground?: {
        main: string;
      };
      scrollThumb?: {
        main: string;
      };
      scrollThumbHover?: {
        main: string;
      };
    };
  }

  interface PaletteOptions {
    scrollBackground?: {
      main: string;
    };
    scrollThumb?: {
      main: string;
    };
    scrollThumbHover?: {
      main: string;
    };
  }
}
