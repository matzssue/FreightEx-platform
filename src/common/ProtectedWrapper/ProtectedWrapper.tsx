import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../store/contexts/UserContext';

export const ProtectedWrapper = ({
  children,
  isStrong = true,
}: {
  children: React.ReactNode;
  isStrong?: boolean;
}) => {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) return isStrong ? <Navigate replace to='/' /> : null;

  return <>{children}</>;
};
