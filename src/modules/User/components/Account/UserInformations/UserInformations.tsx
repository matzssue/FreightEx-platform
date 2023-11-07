import { UserInformation } from './UserInformation';

import styles from './UserInformations.module.scss';

type EditUserInformationsProps = {
  companyName: string;
  name: string;
  surname: string;
  vat_id: string;
};

export const UserInformations = ({
  name,
  surname,
  vat_id,
  companyName,
}: EditUserInformationsProps) => (
  <div className={styles.informations}>
    <UserInformation type='name' label='Name' value={name} />
    <UserInformation type='surname' label='Surname' value={surname} />
    <UserInformation isChangeable={false} label='Company' value={companyName} />
    <UserInformation isChangeable={false} label='Company VATID' value={vat_id} />
  </div>
);
