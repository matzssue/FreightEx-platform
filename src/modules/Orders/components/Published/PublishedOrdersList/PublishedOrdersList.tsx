import styles from './PublishedOrdersList.module.scss';
import { PublishedOrderItem } from '../PublishedOrderItem/PublishedOrderItem';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getPublishedOrders } from 'src/utils/api/supabase/Orders/getPublishedOrders';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { publishedOrdersColumns } from '../../../constants/ordersColumns';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';
import { Paginate } from 'src/common/Pagination/Pagination';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';

import { BsTrash } from 'react-icons/bs';
import { useDeleteOrder } from '../../../hooks/useDeleteOrder';
import { OrdersOptions } from '../../OrdersOptions/OrdersOptions';
import { useSearchById } from 'src/utils/hooks/useSearchById';

export const PublishedOrdersList = () => {
  const { userId } = useUserContext();
  const { changeItemsPerPage, changePage, currentPage, itemsPerPage } = usePaginationContext();

  const deleteOrderMutation = useDeleteOrder();

  useEffect(() => {
    changeItemsPerPage(10);
    changePage(1);
  }, []);

  const {
    data: publishedOrders,
    isLoading: isPublishedOrdersLoading,
    error: publishedOrdersError,
  } = useQuery(
    ['published', currentPage],
    async () => await getPublishedOrders(userId, currentPage, itemsPerPage),
    {
      enabled: !!userId,
    },
  );
  const { handleSubmit, searchRef, filteredItems } = useSearchById(
    publishedOrders?.orders,
    publishedOrders?.totalPages,
  );

  const removeOrderHandler = (id: string) => {
    deleteOrderMutation.mutate(id);
  };

  if (isPublishedOrdersLoading) return <LoadingSpinner />;

  if (publishedOrdersError) {
    return <div>Error loading data</div>;
  }

  const orders = filteredItems?.items
    ? { items: filteredItems.items, totalPages: filteredItems.totalPages }
    : { items: publishedOrders?.orders, totalPages: publishedOrders?.totalPages };
  if (!orders?.items || !orders.totalPages) return;
  return (
    <>
      <OrdersOptions ref={searchRef} onSubmit={handleSubmit} />
      <div>
        <OrdersColumns
          gridColumns='0.2fr 1.8fr 0.4fr 0.4fr 0.8fr 0.7fr'
          columns={publishedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders?.items.map((order) => {
            return (
              <PublishedOrderItem key={order.id} order={order}>
                <span className={styles.buttons}>
                  <button onClick={() => removeOrderHandler(order.id)} className={styles.delete}>
                    <BsTrash />
                  </button>
                </span>
              </PublishedOrderItem>
            );
          })}
          {orders.items.length === 0 && <p>No orders found</p>}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders?.totalPages} />
      </div>
    </>
  );
};
