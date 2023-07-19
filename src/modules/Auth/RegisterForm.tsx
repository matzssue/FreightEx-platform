import { UserStep } from './UserStep';
import { CompanyStep } from './CompanyStep';

import { ConfirmStep } from './ConfirmStep';
import { useAppSelector } from '../../store/hooks';

const Steps = { 0: <UserStep />, 1: <CompanyStep />, 2: <ConfirmStep /> };

export const RegisterForm = () => {
  const { currentStep } = useAppSelector((state) => state.register);

  return <>{Steps[currentStep as keyof typeof Steps]}</>;
};
