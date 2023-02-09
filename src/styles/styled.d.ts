import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
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
      componentsBackground?: {
        main: string;
      };
      border?: {
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
    componentsBackground?: {
      main: string;
    };
    border?: {
      main: string;
    };
  }
}
