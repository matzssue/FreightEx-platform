import styles from './Loads.module.scss';
import { List } from '../../../../../common/Lists/List';
import { noFilterTab, sortData } from '../../loadData';
import { Load, Vehicles } from './Load';
import { getAllLoads } from '../../../../../utils/api/supabase/getAllLoads';
import { getFilteredLoads } from '../../../../../utils/api/supabase/getFilteredLoads';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import { useUserContext } from '../../../../../store/contexts/UserContext';
export const Loads = () => {
  const { filterId } = useParams<string>();

  const filters = useAppSelector((state) => state.loadsFilters.filters);

  const { data: allLoads } = useQuery(['loads'], async () => await getAllLoads());

  const { data: filteredLoads, isLoading } = useQuery(['loads', filterId], async () => {
    if (!filters || !filterId) return [];
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
              <li id={`${load.id}`} key={load.id}>
                <Load
                  loadId={load.id}
                  loadingCity={load.loadingAddress.city}
                  loadingPostCode={load.loadingAddress.postal_code}
                  loadingCountry={load.loadingAddress.country}
                  unloadingCountry={load.unloadingAddress.country}
                  unloadingCity={load.unloadingAddress.city}
                  unloadingPostCode={load.unloadingAddress.postal_code}
                  vehicles={load.vehicleTypes as Vehicles}
                  publisher={`${load.user.name} ${load.user.surname}`}
                  companyName={load.company.name}
                  publishedAt={load.createdAt}
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
