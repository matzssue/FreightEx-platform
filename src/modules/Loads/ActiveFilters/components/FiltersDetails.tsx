import { useAppSelector } from '../../../../store/hooks';
import styles from './FiltersDetails.module.scss';
import { useParams } from 'react-router-dom';

export const FilterDetails = () => {
  const { id } = useParams();
  console.log(id);
  const filters = useAppSelector((state) => state.loadsFilters.filters);
  const currentFilter = filters.filter((filter) => filter.id === id)[0];
  console.log(currentFilter);
  if (!currentFilter) return;
  const { minWeight, maxWeight, minLength, maxLength, loadingAddress, unloadingAddress } =
    currentFilter;
  return (
    <div className={styles.container}>
      {currentFilter && (
        <ul>
          <li>
            Weight: {minWeight && `from ${minWeight}`} {maxWeight && `to ${maxWeight}`}
          </li>
          <li>
            Length: {minLength && `from ${minLength}`} {maxLength && `to ${maxLength}`}
          </li>
          <li>{loadingAddress}</li>
          {unloadingAddress && <li>{unloadingAddress}</li>}
        </ul>
      )}
    </div>
  );
};
