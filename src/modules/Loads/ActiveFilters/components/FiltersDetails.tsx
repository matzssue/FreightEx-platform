import { useAppSelector } from '../../../../store/hooks';
import styles from './FiltersDetails.module.scss';
import { useParams } from 'react-router-dom';

export const FilterDetails = () => {
  const { filterId } = useParams();

  const filters = useAppSelector((state) => state.loadsFilters.filters);
  const currentFilter = filters.filter((filter) => filter.id === filterId)[0];

  if (!currentFilter) return;
  const { minWeight, maxWeight, minLength, maxLength, loadingAddress, unloadingAddress } =
    currentFilter;
  return (
    <div className={styles.container}>
      {currentFilter && (
        <ul>
          <li>
            Weight: {minWeight && `from ${minWeight}T`} {maxWeight && `to ${maxWeight}T`}
          </li>
          <li>
            Length: {minLength && `from ${minLength}ldm`} {maxLength && `to ${maxLength}ldm`}
          </li>
          <li>{loadingAddress}</li>
          {unloadingAddress && <li>{unloadingAddress}</li>}
        </ul>
      )}
    </div>
  );
};
