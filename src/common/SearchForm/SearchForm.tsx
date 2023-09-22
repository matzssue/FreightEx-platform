import styles from './SearchForm.module.scss';
import { FormEventHandler, forwardRef } from 'react';
import { BsSearch } from 'react-icons/bs';
type SearchFormProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  itemName: string;
};

export const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(
  ({ handleSubmit, itemName }, ref) => {
    return (
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
    );
  },
);
