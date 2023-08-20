import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../store/contexts/UserContext';

export const ProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) return <Navigate replace to='/' />;

  return <>{children}</>;
};
