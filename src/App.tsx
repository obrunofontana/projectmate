import React, { useMemo, useState } from 'react';

import { PaletteMode, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useTheme } from 'hooks';
import Router from 'routes/Router';
import { globalStyles } from 'styles/GlobalStyles';

import 'shared/language/i18n';

const typography = {
  htmlFontSize: 10,
  fontFamily: ['Roboto', '-apple-system'].join(','),
};

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Roboto';
        }
      `,
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light Theme
          primary: {
            main: '#EB622F',
          },
          divider: '#fde68a',
          background: {
            default: '#F7F5F4',
            paper: '#F7F5F4',
          },
          text: {
            primary: '#656565',
            secondary: '#505050',
          },
          scrollBackground: {
            main: '#E7E7E7',
          },
          scrollThumb: {
            main: '#D0D0D0',
          },
          scrollThumbHover: {
            main: '#BBBBBB',
          },
          componentsBackground: {
            main: '#FFF',
          },
          border: {
            main: '#D8D8D8',
          },
        }
      : {
          // Dark Theme
          primary: {
            main: '#EB622F',
          },
          divider: '#004282',
          background: {
            default: '#1B1B1B',
            paper: '#1B1B1B',
          },
          text: {
            primary: '#BBBBBB',
            secondary: '#C6C6C6',
          },
          scrollBackground: {
            main: '#2E2E2E',
          },
          scrollThumb: {
            main: '#505050',
          },
          scrollThumbHover: {
            main: '#636363',
          },
          componentsBackground: {
            main: '#2E2E2E',
          },
          border: {
            main: '#434343',
          },
        }),
  },
});

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const { darkMode } = useTheme();

  useMemo(() => {
    if (darkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [darkMode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <CssBaseline />
      <ToastContainer />
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
};

export default App;
