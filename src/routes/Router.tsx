import React, { lazy, Suspense } from 'react';

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import PageUnexpected from 'pages/ErrorPages/PageUnexpected/PageUnexpected';
import Page from 'pages/Page/Page';
import PageLoading from 'pages/PageLoading/PageLoading';
import paths from 'routes/paths';

import ProtectedRoute from './ProtectedRoute';

const Home = lazy(async () => await import('pages/Home/Home'));
const PageNotFound = lazy(async () => await import('pages/ErrorPages/PageNotFound/PageNotFound'));
const PageUnauthorized = lazy(
  async () => await import('pages/ErrorPages/PageUnauthorized/PageUnauthorized'),
);
const RegisterPage = lazy(async () => await import('pages/RegisterPage/RegisterPage'));
const SignInPage = lazy(async () => await import('pages/SignInPage/SignInPage'));
const VerifyEmailPage = lazy(async () => await import('pages/VerifyEmailPage/VerifyEmailPage'));
const AdminPage = lazy(async () => await import('pages/AdminPage/AdminPage'));
const ProfilePage = lazy(async () => await import('pages/ProfilePage/ProfilePage'));

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
  <Suspense fallback={<PageLoading />}>
    <Page>
      <Component />
    </Page>
  </Suspense>
);

export default createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Private Routes */}
      <Route
        path="/"
        errorElement={<PageUnexpected />}
        element={<ProtectedRoute allowedRoles={['user', 'admin']} />}
      >
        <Route element={<Layout />}>
          <Route index path={paths.HOME} element={getRouteElement(Home)} />

          <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
            <Route path={paths.PROFILE} element={getRouteElement(ProfilePage)} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path={paths.ADMIN} element={getRouteElement(AdminPage)} />
          </Route>

          <Route path={paths.UNAUTHORIZED} element={getRouteElement(PageUnauthorized)} />
          <Route path={paths.NOT_FOUND} element={getRouteElement(PageNotFound)} />
        </Route>
      </Route>

      {/* Public Routes */}
      <Route
        path={paths.REGISTER}
        errorElement={<PageUnexpected />}
        element={getRouteElement(RegisterPage)}
      />
      <Route
        path={paths.VERIFY_EMAIL}
        errorElement={<PageUnexpected />}
        element={getRouteElement(VerifyEmailPage)}
      >
        <Route
          path=":verificationCode"
          errorElement={<PageUnexpected />}
          element={getRouteElement(VerifyEmailPage)}
        />
      </Route>
      <Route
        path={paths.SIGN_IN}
        errorElement={<PageUnexpected />}
        element={getRouteElement(SignInPage)}
      />
      <Route path={paths.NOT_FOUND} element={getRouteElement(PageNotFound)} />
    </>,
  ),
);
