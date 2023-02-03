import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from 'routes/Router';
import store from 'store';

import 'shared/language/i18n';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <CssBaseline />
    <ToastContainer />
    <RouterProvider router={Router} />
  </Provider>,
);
