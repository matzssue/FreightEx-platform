import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { Paginate } from 'src/common/Pagination/Pagination';
import { SearchForm } from 'src/common/SearchForm/SearchForm';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { useUserContext } from 'src/store/contexts/UserContext';
import { getReceivedOrders } from 'src/utils/api/supabase/Orders/getReceivedOrders';
import { useSearchById } from 'src/utils/hooks/useSearchById';

import { receivedOrdersColumns } from '../../../constants/ordersColumns';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { ReceivedOrderItem } from '../ReceivedOrderItem/ReceivedOrderItem';

import styles from './ReceivedOrdersList.module.scss';

export const ReceivedOrdersList = () => {
  const { changeItemsPerPage, changePage, currentPage, itemsPerPage } = usePaginationContext();
  const { userId } = useUserContext();

  useEffect(() => {
    changeItemsPerPage(8);
    changePage(1);
  }, []);

  const {
    data: acceptedOrders,
    isError: receivedOrdersError,
    isLoading: receivedOrdersLoading,
  } = useQuery(
    ['receivedOrders', currentPage, itemsPerPage],
    async () => await getReceivedOrders(userId, currentPage, itemsPerPage),
    {
      enabled: !!userId,
    },
  );
  const { handleSubmit, filteredItems, searchRef } = useSearchById(
    acceptedOrders?.orders,
    acceptedOrders?.totalPages,
  );

  if (receivedOrdersLoading) return <LoadingSpinner />;

  if (receivedOrdersError) {
    return <div>Error loading data</div>;
  }
  const orders = filteredItems.items
    ? { items: filteredItems.items, totalPages: filteredItems.totalPages }
    : { items: acceptedOrders?.orders, totalPages: acceptedOrders?.totalPages };

  return (
    <>
      <SearchForm itemName='orders' ref={searchRef} handleSubmit={handleSubmit} />
      <div id='received-orders-list' className={styles['received-table']}>
        <OrdersColumns
          gridColumns='0.2fr 2fr 0.4fr 1.2fr 0.9fr 1fr 1fr'
          columns={receivedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders?.items?.map((order) => (
            <ReceivedOrderItem key={order.id} order={order} />
          ))}
        </ul>
        {orders.items?.length === 0 && <p>No orders found</p>}
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders?.totalPages ? orders.totalPages : 0} />
      </div>
    </>
  );
};
