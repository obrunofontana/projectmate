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
  fontFamily: ['Ubuntu', 'Roboto', '-apple-system'].join(','),
};

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Ubuntu';
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
            main: '#4461F2',
          },
          divider: '#fde68a',
          background: {
            default: '#F6F6F6',
            paper: '#F6F6F6',
          },
          text: {
            primary: '#000',
            secondary: '#27272a',
          },
        }
      : {
          // Dark Theme
          primary: {
            main: '#4461F2',
          },
          divider: '#004282',
          background: {
            default: '#14162E',
            paper: '#14162E',
          },
          text: {
            primary: '#fff',
            secondary: '#71717a',
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
