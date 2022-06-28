import { ApiContext } from '@/presentation/contexts';
import { useNavigate } from 'react-router';
import { useContext } from 'react';

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  return (): void => {
    setCurrentAccount(undefined);
    navigate('/login');
  };
};
