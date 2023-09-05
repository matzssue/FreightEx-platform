import styles from './LoadAddress.module.scss';
import { memo } from 'react';

type LoadAddress = {
  country: string;
  postCode: string;
  city: string;
};
export const LoadAddress = memo(({ country, postCode, city }: LoadAddress) => {
  return (
    <>
      <p className={styles.country}>{country}</p>
      <p className={styles['post-code']}>
        {postCode} {city}
      </p>
    </>
  );
});
