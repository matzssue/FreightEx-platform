import styles from './ReceivedOrdersList.module.scss';
import { receivedOrdersColumns } from '../../../constants/ordersColumns';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getReceivedOrders } from 'src/utils/api/supabase/Orders/getReceivedOrders';
import { ReceivedOrderItem } from '../ReceivedOrderItem/ReceivedOrderItem';
import { useEffect } from 'react';
import { Paginate } from 'src/common/Pagination/Pagination';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { useSearchById } from 'src/utils/hooks/useSearchById';
import { SearchForm } from 'src/common/SearchForm/SearchForm';

export const ReceivedOrdersList = () => {
  const { changeItemsPerPage, changePage, currentPage, itemsPerPage } = usePaginationContext();
  const { userId } = useUserContext();

  useEffect(() => {
    changeItemsPerPage(9);
    changePage(1);
  }, []);

  const {
    data: acceptedOrders,
    isError: receivedOrdersError,
    isLoading: receivedOrdersLoading,
  } = useQuery(
    ['receivedOrders', currentPage],
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
          gridColumns='0.2fr 0.3fr 2fr 0.4fr 1.2fr 0.9fr 1fr 1fr'
          columns={receivedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders?.items?.map((order) => {
            return <ReceivedOrderItem key={order.id} order={order} />;
          })}
        </ul>
        {orders.items?.length === 0 && <p>No orders found</p>}
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders?.totalPages ? orders.totalPages : 0} />
      </div>
    </>
  );
};
