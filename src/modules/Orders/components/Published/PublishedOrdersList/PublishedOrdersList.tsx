import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import AlertDialog from 'src/common/Dialog/AlertDialog';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { Paginate } from 'src/common/Pagination/Pagination';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { useUserContext } from 'src/store/contexts/UserContext';
import { getPublishedOrders } from 'src/utils/api/supabase/Orders/getPublishedOrders';
import { useSearchById } from 'src/utils/hooks/useSearchById';

import { publishedOrdersColumns } from '../../../constants/ordersColumns';
import { useDeleteOrder } from '../../../hooks/useDeleteOrder';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { OrdersOptions } from '../../OrdersOptions/OrdersOptions';
import { PublishedOrderItem } from '../PublishedOrderItem/PublishedOrderItem';

import styles from './PublishedOrdersList.module.scss';

export const PublishedOrdersList = () => {
  const { userId } = useUserContext();
  const { changeItemsPerPage, changePage, currentPage, itemsPerPage } = usePaginationContext();
  const [openId, setOpenId] = useState<string | null>(null);
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
    ['published', currentPage, itemsPerPage],
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

  const agreeDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    removeOrderHandler(id);
  };

  return (
    <>
      <OrdersOptions ref={searchRef} onSubmit={handleSubmit} />
      <div>
        <OrdersColumns
          gridColumns='0.2fr 1.8fr 0.4fr 0.4fr 0.8fr 0.7fr'
          columns={publishedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders.items?.map((order) => (
            <PublishedOrderItem key={order.id} order={order}>
              <AlertDialog
                agreeHandler={(e) => agreeDeleteHandler(e, order.id)}
                description='delete-order-confirmation'
                close={() => setOpenId(null)}
                title={`delete-confirmation`}
                open={order.id === openId}
                label={`Confirmation`}
              >
                Are you sure you want to delete this order?
              </AlertDialog>
              <span className={styles.buttons}>
                <button className={styles.delete} onClick={() => setOpenId(order.id)}>
                  <BsTrash />
                </button>
              </span>
            </PublishedOrderItem>
          ))}
          {orders.items?.length === 0 && <p>No orders found</p>}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders?.totalPages ? orders.totalPages : 0} />
      </div>
    </>
  );
};
