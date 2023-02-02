import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import Router from 'routes/Router';
import store from 'store';

import 'shared/language/i18n';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>,
);
