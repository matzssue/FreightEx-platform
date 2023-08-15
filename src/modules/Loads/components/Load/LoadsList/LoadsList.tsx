import styles from './LoadsList.module.scss';
import { List } from '../../../../../common/Lists/List';
import { loadColumns } from '../../../constants/loadColumns';
import { LoadCard } from '../LoadCard/LoadCard';
import { getAllLoads } from '../../../../../utils/api/supabase/Loads/getAllLoads';
import { getFilteredLoads } from '../../../../../utils/api/supabase/Loads/getFilteredLoads';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../store/hooks';
import { useUserContext } from '../../../../../store/contexts/UserContext';
import { LoadingSpinner } from '../../../../../common/LoadingSpinner/LoadingSpinner';
import { useAcceptOffer } from '../../../../../hooks/useAcceptOffer';
import { Paginate } from '../../Pagination/Pagination';

import { useState } from 'react';
import { Load as TLoad } from '../../../../../utils/api/supabase/types';
export const Loads = () => {
  const { filterId } = useParams<string>();
  const { userData } = useUserContext();
  const [slicedLoads, setSlicedLoads] = useState<TLoad[] | undefined>();

  const acceptOfferMutation = useAcceptOffer();
  const filters = useAppSelector((state) => state.loadsFilters.filters);

  const { data: allLoads, isLoading: isAllLoading } = useQuery(
    ['loads'],
    async () => await getAllLoads(),
  );

  const { data: filteredLoads, isLoading: isFilteredLoading } = useQuery(
    ['loads', filterId],
    async () => {
      if (!filters || !filterId) return [];
      const foundFilter = filters.find((filter) => filter.id === filterId);
      if (!foundFilter) return;
      return await getFilteredLoads(foundFilter);
    },
  );

  const loads = filterId ? filteredLoads : allLoads;

  if (!userData) return;
  const acceptOfferHandler = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    acceptOfferMutation?.mutateAsync({ loadId: id, userId: userData.id });
  };

  return (
    <div className={styles['loads-container']}>
      <div className={styles['sort-list']}>
        <List list={loadColumns} />
      </div>
      <div className={styles.loads}>
        <ul>
          {isAllLoading || isFilteredLoading ? (
            <LoadingSpinner />
          ) : (
            slicedLoads?.map((load) => (
              <li id={`${load.id}`} key={load.id}>
                <LoadCard onAccept={(e) => acceptOfferHandler(e, load.id)} data={load} />
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Paginate setSlicedLoads={setSlicedLoads} data={loads} />
      </div>
    </div>
  );
};