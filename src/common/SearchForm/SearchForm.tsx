import { FormEventHandler, forwardRef } from 'react';
import { BsSearch } from 'react-icons/bs';

import styles from './SearchForm.module.scss';
type SearchFormProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  itemName: string;
};

export const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(
  ({ handleSubmit, itemName }, ref) => (
    <div className={styles['search-form']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`search-${itemName}`} id={`search-${itemName}-label`}>
          Search {itemName} id
        </label>
        <div className={styles['search-input']}>
          <BsSearch />
          <input ref={ref} name={`search${itemName}`} id={`search-${itemName}`} type='search' />
        </div>
        <button className={styles.search} type='submit'>
          Search
        </button>
      </form>
    </div>
  ),
);
