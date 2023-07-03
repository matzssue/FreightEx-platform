import styles from './Loads.module.scss';
import { List } from '../../../../common/Lists/List';
import { sortData } from '../loadData';
import { Load, Vehicles } from './Load';
import { getAllLoads } from '../../../../utils/api/supabase/load';
import { useQuery } from '@tanstack/react-query';
export const Loads = () => {
  const { data, isLoading } = useQuery(['orders'], async () => await getAllLoads());

  return (
    <div>
      <div className={styles['sort-list']}>
        <List list={sortData} />
      </div>
      <div className={styles.loads}>
        <ul>
          {isLoading ? (
            <p>loading</p>
          ) : (
            data?.map((load) => (
              <li key={load.id}>
                <Load
                  key={load.id}
                  loadingCity={load.loadingAddress.city}
                  loadingPostCode={load.loadingAddress.postal_code}
                  loadingCountry={load.loadingAddress.country}
                  unloadingCountry={load.unloadingAddress.country}
                  unloadingCity={load.unloadingAddress.city}
                  unloadingPostCode={load.unloadingAddress.postal_code}
                  vehicles={load.vehicleTypes as Vehicles}
                  {...load}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
