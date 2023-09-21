import styles from './SearchForm.module.scss';
import { forwardRef } from 'react';
import { BsSearch } from 'react-icons/bs';
type SearchFormProps = {
  handleSubmit: any;
};

export const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(({ handleSubmit }, ref) => {
  return (
    <div className={styles['search-form']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search-order' id='search-order-label'>
          Search order id
        </label>
        <div className={styles['search-input']}>
          <BsSearch />
          <input ref={ref} name='searchOrder' id='search-order' type='search' />
        </div>
        <button className={styles.search} type='submit'>
          Search
        </button>
      </form>
    </div>
  );
});
