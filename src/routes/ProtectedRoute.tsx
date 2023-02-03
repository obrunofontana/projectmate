import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import FullScreenLoader from 'components/FullScreenLoader/FullScreenLoader';
import { userApi } from 'store/api/userApi';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in']);
  const loggedIn = cookies.logged_in;

  const { data: user } = userApi.endpoints.getMe.useQuery(null, {
    skip: !loggedIn,
  });

  const location = useLocation();

  if (loggedIn && !user) {
    return <FullScreenLoader />;
  }

  return loggedIn && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : loggedIn && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
