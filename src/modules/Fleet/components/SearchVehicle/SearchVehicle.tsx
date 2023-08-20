import { ChangeEventHandler } from 'react';
import styles from './SearchVehicle.module.scss';

export const SearchVehicle = ({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <form role='search' className={styles['search-container']}>
      <label htmlFor='vehicle'>Search for a vehicle by registration number </label>
      <input id='vehicle' type='search' name='vehicle' value={value} onChange={onChange} />
    </form>
  );
};
