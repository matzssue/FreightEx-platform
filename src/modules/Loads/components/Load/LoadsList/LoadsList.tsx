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
import { useAcceptOffer } from '../../../hooks/useAcceptOffer';
import { Paginate } from '../../../../../common/Pagination/Pagination';
import { useMemo } from 'react';
import { useDeleteOrder } from 'src/modules/Orders/hooks/useDeleteOrder';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
export const Loads = () => {
  const { filterId } = useParams<string>();
  const acceptOfferMutation = useAcceptOffer();
  const deleteOfferMutation = useDeleteOrder();
  const { userData } = useUserContext();
  const { currentPage, itemsPerPage } = usePaginationContext();

  const filters = useAppSelector((state) => state.loadsFilters.filters);

  const { data: allLoads, isLoading: isAllLoading } = useQuery(
    ['loads', currentPage],
    async () => await getAllLoads(currentPage, itemsPerPage),
  );

  const fetchFilteredLoads = async () => {
    const foundFilter = filters.find((filter) => filter.id === filterId);
    if (!foundFilter) return;
    return await getFilteredLoads(foundFilter, currentPage, itemsPerPage);
  };

  const { data: filteredLoads, isLoading: isFilteredLoading } = useQuery(
    ['filteredLoads', filterId, currentPage],
    fetchFilteredLoads,
    {
      enabled: Boolean(filters && filterId),
    },
  );

  const memoizedLoads = useMemo(
    () => (filterId ? filteredLoads : allLoads),
    [filterId, filteredLoads, allLoads],
  );

  const acceptOfferHandler = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    acceptOfferMutation.mutate({ loadId: id, userId: userData.id });
  };
  const deleteOrderHandler = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    deleteOfferMutation.mutate(id);
  };
  if (isAllLoading || (filteredLoads && isFilteredLoading)) return <LoadingSpinner />;
  if (!memoizedLoads) return;
  return (
    <div id='loads-container' className={styles['loads-container']}>
      <div className={styles['sort-list']}>
        <List list={loadColumns} />
      </div>
      <div className={styles.loads}>
        <ul>
          {memoizedLoads.loads?.map((load) => (
            <li id={`${load.id}`} key={load.id}>
              <LoadCard
                onDelete={(e) => deleteOrderHandler(e, load.id)}
                onAccept={(e) => acceptOfferHandler(e, load.id)}
                data={load}
              />
            </li>
          ))}
          {memoizedLoads.loads && memoizedLoads.loads?.length <= 0 ? (
            <p className={styles['no-results']}>No results found</p>
          ) : (
            ''
          )}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={memoizedLoads.totalPages} />
      </div>
    </div>
  );
};
