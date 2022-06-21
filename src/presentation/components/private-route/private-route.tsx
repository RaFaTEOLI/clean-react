import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts';

interface Props {
  children?: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? <>{children}</> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
