import { ChangeEventHandler } from 'react';

import styles from './SearchVehicle.module.scss';

export const SearchVehicle = ({
  value,
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => {
  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} role='search' className={styles['search-container']}>
      <label htmlFor='vehicle'>Search for a vehicle by registration number </label>
      <input id='vehicle' type='search' name='vehicle' value={value} onChange={onChange} />
    </form>
  );
};
