import { Link } from 'react-router-dom';
import styles from './ActiveFilters.module.scss';
import { useAppSelector } from '../../../../store/hooks';
import { IoCloseCircleSharp } from 'react-icons/io5';
export const ActiveFilters = () => {
  const filters = useAppSelector((state) => state.loadsFilters.filters);
  const deleteFilterHandler = () => {};
  return (
    <div className={styles['list-container']}>
      <ul>
        {filters.map((filter, i) => (
          <li key={i}>
            <Link to={`/loads/filters/${filter.id}`}>{filter.loadingAddressData.city}</Link>
            <button onClick={deleteFilterHandler} className={styles.close}>
              <IoCloseCircleSharp />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
