import React from 'react';
import { Navigate } from 'react-router-dom';
import { currentAccountState } from '@/presentation/components';
import { useRecoilValue } from 'recoil';

interface Props {
  children?: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  return getCurrentAccount()?.accessToken ? <>{children}</> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
