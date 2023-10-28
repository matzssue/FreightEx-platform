import { memo } from 'react';

import styles from './LoadAddress.module.scss';

type LoadAddress = {
  city: string | null;
  country: string;
  postCode: string;
};
export const LoadAddress = memo(({ country, postCode, city }: LoadAddress) => (
  <>
    <p className={styles.country}>{country}</p>
    <p className={styles['post-code']}>
      {postCode} {city}
    </p>
  </>
));
