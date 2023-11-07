import { Navigate } from 'react-router-dom';
import { Loader } from 'src/modules/Home/components/Loader/Loader';

import { useUserContext } from '../../store/contexts/UserContext';

export const ProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useUserContext();

  if (isLoading) return <Loader />;
  if (!isLoggedIn) return <Navigate replace to='/' />;
  return <>{children}</>;
};
