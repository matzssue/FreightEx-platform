import { AiOutlineArrowDown } from 'react-icons/ai';

import styles from './FiltersMenu.module.scss';
import { FilterCard } from './FilterCard';
export const FiltersMenu = () => {
  return (
    <div className={styles['filters-container']}>
      <FilterCard filterName={'Truck'} topLeftLabel={'min'} topRightLabel={'max'}>
        <div className={styles.input}>
          <label>Weight</label>
          <input type='text'></input>
          <input type='text'></input>
        </div>
        <div className={styles.input}>
          <label>Length</label>
          <input type='text' />
          <input type='text' />
        </div>
      </FilterCard>
      <FilterCard filterName={'Location'} topLeftLabel={'min'} topRightLabel={'max'}>
        <div className={styles.input}>
          <label>Weight</label>
          <input type='text'></input>
          <input type='text'></input>
        </div>
        <div className={styles.input}>
          <label>Length</label>
          <input type='text' />
          <input type='text' />
        </div>
      </FilterCard>
      <FilterCard filterName={'Date'} topLeftLabel={'min'} topRightLabel={'max'}>
        <div className={styles.input}>
          <label>Weight</label>
          <input type='text'></input>
          <input type='text'></input>
        </div>
        <div className={styles.input}>
          <label>Length</label>
          <input type='text' />
          <input type='text' />
        </div>
      </FilterCard>
      <button className={styles['show-filters__button']}>
        <AiOutlineArrowDown />
      </button>
    </div>
  );
};
