import styles from './PublishedOrdersList.module.scss';
import { PublishedOrderItem } from '../PublishedOrderItem/PublishedOrderItem';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getPublishedOrders } from 'src/utils/api/supabase/Orders/getPublishedOrders';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { publishedOrdersColumns } from '../../../constants/ordersColumns';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { useEffect, useState, useRef } from 'react';
import { Paginate } from 'src/common/Pagination/Pagination';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { Load } from 'src/utils/api/supabase/types';
import { BsTrash } from 'react-icons/bs';
import { useDeleteOrder } from '../../../hooks/useDeleteOrder';
import { OrdersOptions } from '../../OrdersOptions/OrdersOptions';

type FilteredOrders = {
  orders: Load[] | null;
  totalPages: number | null;
};

export const PublishedOrdersList = () => {
  const { userId } = useUserContext();
  const { changeItemsPerPage, changePage, currentPage, itemsPerPage } = usePaginationContext();
  const searchOrderRef = useRef<HTMLInputElement>(null);
  const [filteredLoads, setFilteredLoads] = useState<FilteredOrders | null>({
    orders: null,
    totalPages: null,
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchOrderRef?.current?.value;
    if (searchValue && publishedOrders) {
      const filteredOrders = {
        orders: publishedOrders.orders.filter((order) => order.id.toString() === searchValue),
        totalPages: publishedOrders.totalPages,
      };
      setFilteredLoads(filteredOrders);
    }
    if (!searchValue) {
      setFilteredLoads({ orders: null, totalPages: null });
    }
  };

  const removeOrderHandler = (id: string) => {
    deleteOrderMutation.mutate(id);
  };

  if (isPublishedOrdersLoading) return <LoadingSpinner />;

  if (publishedOrdersError) {
    return <div>Error loading data</div>;
  }

  const orders = filteredLoads?.orders ? filteredLoads : publishedOrders;
  if (!orders?.orders || !orders.totalPages) return;
  return (
    <>
      <OrdersOptions ref={searchOrderRef} onSubmit={handleSubmit} />
      <div>
        <OrdersColumns
          gridColumns='0.2fr 1.8fr 0.4fr 0.4fr 0.8fr 0.7fr'
          columns={publishedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders?.orders.map((order) => {
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
          {orders.orders.length === 0 && <p>No orders found</p>}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders?.totalPages} />
      </div>
    </>
  );
};
