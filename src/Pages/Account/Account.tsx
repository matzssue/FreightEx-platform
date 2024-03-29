import { PageLayout } from '../../common/PageLayout/PageLayout';
import { ProtectedWrapper } from '../../common/ProtectedWrapper/ProtectedWrapper';
import { UserAccount } from '../../modules/User/components/Account/UserAccount/UserAccount';

export const Account = () => (
  <ProtectedWrapper>
    <PageLayout>
      <UserAccount />
    </PageLayout>
  </ProtectedWrapper>
);
