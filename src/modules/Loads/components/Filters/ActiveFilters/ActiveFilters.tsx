import styles from './ActiveFilters.module.scss';
import { useAppSelector } from '../../../../../store/hooks';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useAppDispatch } from '../../../../../store/hooks';
import { removeFilter } from 'src/store/reducers/loadsFiltersSlice';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const ActiveFilters = () => {
  const filters = useAppSelector((state) => state.loadsFilters.filters);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();

  const deleteFilterHandler = (id: string) => {
    dispatch(removeFilter(id));
    navigation('/loads');
  };

  return (
    <div className={styles['list-container']}>
      <ul>
        <li>
          <NavLink className={location.pathname === '/loads' ? styles.active : ''} to={'/loads'}>
            All Loads
          </NavLink>
        </li>
        {filters.map((filter, i) => (
          <li key={i}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={`/loads/filters/${filter.id}`}
            >
              {filter.loadingAddressData.city}
            </NavLink>
            <button onClick={() => deleteFilterHandler(filter.id)} className={styles.close}>
              <IoCloseCircleSharp />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
