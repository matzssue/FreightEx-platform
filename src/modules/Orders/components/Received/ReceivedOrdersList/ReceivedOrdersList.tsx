import styles from './ReceivedOrdersList.module.scss';
import { receivedOrdersColumns } from '../../../constants/ordersColumns';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getReceivedOrders } from 'src/utils/api/supabase/Orders/getReceivedOrders';
import { ReceivedOrderItem } from '../ReceivedOrderItem/ReceivedOrderItem';
import { useRef, useState, useEffect } from 'react';
import { Paginate } from 'src/common/Pagination/Pagination';
import { AcceptedLoad } from 'src/utils/api/supabase/types';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';

type FilteredOrders = {
  orders: AcceptedLoad[] | null;
  totalPages: number | null;
};

export const ReceivedOrdersList = () => {
  const { changeItemsPerPage, changePage, currentPage, itemsPerPage } = usePaginationContext();
  const { userId } = useUserContext();

  useEffect(() => {
    changeItemsPerPage(9);
    changePage(1);
  }, []);

  const [filteredLoads, setFilteredLoads] = useState<FilteredOrders>({
    orders: null,
    totalPages: null,
  });
  const searchOrderRef = useRef<HTMLInputElement>(null);

  const {
    data: acceptedOrders,
    isError: receivedOrdersError,
    isLoading: receivedOrdersLoading,
  } = useQuery(
    ['received', currentPage],
    async () => await getReceivedOrders(userId, currentPage, itemsPerPage),
    {
      enabled: !!userId,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchOrderRef?.current?.value;
    if (searchValue && acceptedOrders) {
      const filteredOrders = {
        orders: acceptedOrders?.orders.filter((order) => order.id.toString() === searchValue),
        totalPages: acceptedOrders?.totalPages,
      };
      setFilteredLoads(filteredOrders);
    }
    if (!searchValue) {
      setFilteredLoads({ orders: null, totalPages: null });
    }
  };
  if (receivedOrdersLoading)
    return (
      <td>
        <LoadingSpinner />;
      </td>
    );

  if (receivedOrdersError) {
    return <div>Error loading data</div>;
  }
  const orders = filteredLoads.orders ? filteredLoads : acceptedOrders;
  if (!orders?.orders || !orders.totalPages) return;
  return (
    <>
      <div className={styles['search-bar']}>
        <form onSubmit={handleSubmit}>
          <label>Search order id</label>
          <input ref={searchOrderRef} type='search' />
          <button className={styles.search}>Search</button>
        </form>
      </div>
      <div className={styles['received-table']}>
        <OrdersColumns
          gridColumns='0.2fr 0.3fr 2fr 0.4fr 1.2fr 0.9fr 1fr 1fr'
          columns={receivedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders?.orders?.map((order) => {
            return <ReceivedOrderItem key={order.id} order={order} />;
          })}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders?.totalPages} />
      </div>
    </>
  );
};
