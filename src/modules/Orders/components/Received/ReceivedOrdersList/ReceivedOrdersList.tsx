import styles from './ReceivedOrdersList.module.scss';
import { receivedOrdersColumns } from '../../../constants/ordersColumns';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getReceivedOrders } from 'src/utils/api/supabase/Orders/getReceivedOrders';
import { ReceivedOrderItem } from '../ReceivedOrderItem/ReceivedOrderItem';
import { useRef, useState } from 'react';
import { Paginate } from 'src/common/Pagination/Pagination';
import { AcceptedLoad } from 'src/utils/api/supabase/types';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
export const ReceivedOrdersList = () => {
  const { userId } = useUserContext();
  const [slicedLoads, setSlicedLoads] = useState<AcceptedLoad[] | null>(null);
  const [filteredLoads, setFilteredLoads] = useState<AcceptedLoad[] | null>(null);
  const searchOrderRef = useRef<HTMLInputElement>(null);

  const {
    data: acceptedOrders,
    isError: receivedOrdersError,
    isLoading: receivedOrdersLoading,
  } = useQuery(['received'], async () => await getReceivedOrders(userId), {
    enabled: !!userId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchOrderRef?.current?.value;
    if (searchValue && slicedLoads) {
      const filteredOrders = slicedLoads.filter((order) => order.id.toString() === searchValue);
      setFilteredLoads(filteredOrders);
    }
    if (!searchValue) {
      setFilteredLoads(null);
    }
  };
  if (receivedOrdersLoading) return <LoadingSpinner />;

  if (receivedOrdersError) {
    return <div>Error loading data</div>;
  }
  const orders = filteredLoads ? filteredLoads : slicedLoads;

  return (
    <>
      <div className={styles['search-bar']}>
        <form onSubmit={handleSubmit}>
          <label>Search order id</label>
          <input ref={searchOrderRef} type='search' />
          <button className={styles.search}>Search</button>
        </form>
      </div>
      <table>
        <OrdersColumns columns={receivedOrdersColumns} />
        <tbody>
          {orders?.map((order) => {
            return <ReceivedOrderItem key={order.id} order={order} />;
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Paginate<AcceptedLoad> setSlicedItems={setSlicedLoads} data={acceptedOrders} />
      </div>
    </>
  );
};