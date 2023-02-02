import React, { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Page from 'pages/Page/Page';
import PageLoading from 'pages/PageLoading/PageLoading';
import paths from 'routes/paths';

const Home = lazy(async () => await import('pages/Home/Home'));
const PageNotFound = lazy(async () => await import('pages/PageNotFound/PageNotFound'));

interface Routes {
  path: string;
  element: React.ReactNode;
}

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
  <Suspense fallback={<PageLoading />}>
    <Page>
      <Component />
    </Page>
  </Suspense>
);

const routes: Routes[] = [
  { path: paths.HOME, element: getRouteElement(Home) },
  { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
