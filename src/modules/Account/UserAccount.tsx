import styles from './UserAccount.module.scss';
import { useUserContext } from '../../store/contexts/UserContext';
import { getCompany } from '../../utils/api/supabase/Company/getCompany';
import { useQuery } from '@tanstack/react-query';
import { CloseButton } from '../../common/Buttons/CloseButton';
import { EditAccount } from './EditAccount';
import { avatarLink } from '../../constants/avatarLink';
import { UserInformations } from './UserInformations';

export const UserAccount = () => {
  const { userData } = useUserContext();
  if (!userData) return;

  const { avatar, name, surname, company_vat_id } = userData;

  const { data: company, isLoading } = useQuery(
    ['companies', company_vat_id],
    async () => await getCompany(company_vat_id),
  );

  if (isLoading || !company) return <div>loading...</div>;
  const { name: companyName, vat_id } = company;

  console.log(userData);

  return (
    <>
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
            className={styles.avatar}
            height={'150px'}
            width={'150px'}
            src={`${avatarLink}${avatar}`}
          />
          <EditAccount />
          <UserInformations
            companyName={companyName}
            vat_id={vat_id}
            name={name}
            surname={surname}
          />
        </div>
      </section>
    </>
  );
};
