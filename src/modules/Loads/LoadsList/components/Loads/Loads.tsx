import styles from './Loads.module.scss';
import { List } from '../../../../../common/Lists/List';
import { sortData } from '../../loadData';
import { Load } from './Load';
import { getAllLoads } from '../../../../../utils/api/supabase/getAllLoads';
import { getFilteredLoads } from '../../../../../utils/api/supabase/getFilteredLoads';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../store/hooks';
import { useUserContext } from '../../../../../store/contexts/UserContext';
import { LoadingSpinner } from '../../../../../common/Spinner';
import { useAcceptOffer } from '../../../../../hooks/useAcceptOffer';
export const Loads = () => {
  const { filterId } = useParams<string>();
  const { userData } = useUserContext();

  const acceptOfferMutation = useAcceptOffer();
  console.log(userData);
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
  // console.log(loads);
  if (!userData) return;
  const acceptOfferHandler = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    acceptOfferMutation?.mutateAsync({ loadId: id, userId: userData.id });
  };

  return (
    <div>
      <div className={styles['sort-list']}>
        <List list={sortData} />
      </div>
      <div className={styles.loads}>
        <ul>
          {isAllLoading || isFilteredLoading ? (
            <LoadingSpinner />
          ) : (
            loads?.map((load) => (
              <li id={`${load.id}`} key={load.id}>
                <Load onAccept={(e) => acceptOfferHandler(e, load.id)} data={load} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
