import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children?: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const user = false;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
