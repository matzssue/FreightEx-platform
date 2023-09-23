import styles from './ActiveFilters.module.scss';
import { useAppSelector } from '../../../../../store/hooks';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useAppDispatch } from '../../../../../store/hooks';
import { removeFilter } from 'src/store/reducers/loadsFiltersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';

export const ActiveFilters = () => {
  const filters = useAppSelector((state) => state.loadsFilters.filters);
  const { loadId } = useParams();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { changePage } = usePaginationContext();
  const deleteFilterHandler = (id: string) => {
    dispatch(removeFilter(id));
    navigation('/loads');
  };
  const handleChangeFilter = () => {
    changePage(1);
  };
  return (
    <div className={styles['list-container']}>
      <ul id='filters-cards'>
        <li>
          <NavLink
            className={
              location.pathname == '/loads' || location.pathname === `/loads/${loadId}`
                ? styles.active
                : ''
            }
            to={'/loads'}
          >
            All Loads
          </NavLink>
        </li>
        {filters.map((filter, i) => (
          <li key={i}>
            <NavLink
              onClick={handleChangeFilter}
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
