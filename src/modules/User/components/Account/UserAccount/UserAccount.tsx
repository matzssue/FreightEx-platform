import { useQuery } from '@tanstack/react-query';
import { CloseButton } from 'src/common/Buttons/CloseButton/CloseButton';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';

import { avatarLink } from '../../../../../constants/avatarLink';
import { useUserContext } from '../../../../../store/contexts/UserContext';
import { getCompany } from '../../../../../utils/api/supabase/Company/getCompany';
import { EditAccount } from '../EditAccount/EditAccount';
import { UserInformations } from '../UserInformations/UserInformations';

import styles from './UserAccount.module.scss';

export const UserAccount = () => {
  const { userData } = useUserContext();

  const { avatar, name, surname, company_vat_id } = userData;

  const { data: company, isLoading } = useQuery(
    ['companies', company_vat_id],
    async () => await getCompany(company_vat_id),
    { enabled: !!company_vat_id },
  );

  if (isLoading || !company || !userData) {
    return <LoadingSpinner />;
  }

  const { name: companyName, vat_id } = company;

  return (
    <section className={styles['container']}>
      <div className={styles['account-container']}>
        <div className={styles.header}>
          <CloseButton closeLink={'/loads'} />
          <h1>Account Settings</h1>
        </div>
        <h2>
          {name} {surname}
        </h2>
        <img
          alt='user-avatar'
          className={styles.avatar}
          height={'150px'}
          width={'150px'}
          src={`${avatarLink}${avatar}`}
        />
        <EditAccount />
        <UserInformations companyName={companyName} vat_id={vat_id} name={name} surname={surname} />
      </div>
    </section>
  );
};
