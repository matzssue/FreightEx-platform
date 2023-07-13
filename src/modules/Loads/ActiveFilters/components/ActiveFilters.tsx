import { Link } from 'react-router-dom';
import styles from './ActiveFilters.module.scss';
import { useAppSelector } from '../../../../store/hooks';
export const ActiveFilters = () => {
  const filters = useAppSelector((state) => state.loadsFilters.filters);
  console.log(filters);
  return (
    <div className={styles['list-container']}>
      {filters.map((filter, i) => (
        <Link key={i} to={`/loads/${filter.id}`}>
          {filter.loadingAddressData.city}
        </Link>
      ))}
    </div>
  );
};
