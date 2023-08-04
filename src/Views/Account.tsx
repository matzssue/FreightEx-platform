import { PageLayout } from '../common/PageLayout';
import { ProtectedWrapper } from '../common/ProtectedWrapper';
import { UserAccount } from '../modules/Account/UserAccount';

export const Account = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <UserAccount />
      </PageLayout>
    </ProtectedWrapper>
  );
};
