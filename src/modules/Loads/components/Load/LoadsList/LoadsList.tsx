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
import { useMemo, useState } from 'react';
import { useDeleteOrder } from 'src/modules/Orders/hooks/useDeleteOrder';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import AlertDialog from 'src/common/Dialog/AlertDialog';

type SelectedDialog = 'accept' | 'delete' | null;

export const Loads = () => {
  const { filterId } = useParams<string>();
  const acceptOfferMutation = useAcceptOffer();
  const deleteOfferMutation = useDeleteOrder();
  const { userData } = useUserContext();
  const { currentPage, itemsPerPage } = usePaginationContext();
  const [selectedDialog, setSelectedDialog] = useState<SelectedDialog>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const filters = useAppSelector((state) => state.loadsFilters.filters);

  const { data: allLoads, isLoading: isAllLoading } = useQuery(
    ['loads', currentPage, itemsPerPage],
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
    e.preventDefault();
    console.log(id);
    acceptOfferMutation.mutate({ loadId: id, userId: userData.id });
  };
  const deleteOrderHandler = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    console.log(id);
    deleteOfferMutation.mutate(id);
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setSelectedDialog('delete');
    setOpenId(id);
  };
  const onAcceptClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setSelectedDialog('accept');
    setOpenId(id);
  };

  const agreeHandler = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    if (selectedDialog === 'delete') {
      deleteOrderHandler(e, id);
    } else if (selectedDialog === 'accept') {
      acceptOfferHandler(e, id);
    }
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
              <AlertDialog
                agreeHandler={(e) => agreeHandler(e, load.id)}
                description={`${selectedDialog}-load-confirmation`}
                close={() => setOpenId(null)}
                title={`${selectedDialog}-confirmation`}
                open={load.id === openId}
                label={`Confirmation`}
              >
                Are you sure you want to {selectedDialog} this order?
              </AlertDialog>
              <LoadCard
                onDelete={(e) => onDeleteClick(e, load.id)}
                onAccept={(e) => onAcceptClick(e, load.id)}
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
