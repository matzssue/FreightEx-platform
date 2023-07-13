import styles from './Loads.module.scss';
import { List } from '../../../../../common/Lists/List';
import { noFilterTab, sortData } from '../../loadData';
import { Load, Vehicles } from './Load';
import { getAllLoads, getFilteredLoads } from '../../../../../utils/api/supabase/load';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
export const Loads = () => {
  const { filterId } = useParams<string>();
  console.log(filterId);

  const filters = useAppSelector((state) => state.loadsFilters.filters);

  const { data: allLoads } = useQuery(['loads'], async () => await getAllLoads());

  const { data: filteredLoads, isLoading } = useQuery(['loads', filterId], async () => {
    if (!filters || !filterId || filterId === noFilterTab) return [];
    const foundFilter = filters.find((filter) => filter.id === filterId);
    if (!foundFilter) return;
    return await getFilteredLoads(foundFilter);
  });

  const loads = filterId && filterId !== noFilterTab ? filteredLoads : allLoads;
  console.log(loads);
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
            loads?.map((load) => (
              <li key={load.id}>
                <Load
                  loadId={load.id}
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
