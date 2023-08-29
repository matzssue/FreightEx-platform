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
export const PublishedOrdersList = () => {
  const { userId } = useUserContext();
  const { changeLoadsPerPage } = usePaginationContext();
  const searchOrderRef = useRef<HTMLInputElement>(null);
  const [slicedLoads, setSlicedLoads] = useState<Load[] | null>(null);
  const [filteredLoads, setFilteredLoads] = useState<Load[] | null>(null);
  const deleteOrderMutation = useDeleteOrder();

  const {
    data: publishedOrders,
    isLoading: isPublishedOrdersLoading,
    error: publishedOrdersError,
  } = useQuery(['published'], async () => await getPublishedOrders(userId), {
    enabled: !!userId,
  });

  useEffect(() => {
    changeLoadsPerPage(10);
  }, []);

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

  const removeOrderHandler = (id: string) => {
    deleteOrderMutation.mutate(id);
  };

  if (isPublishedOrdersLoading) return <LoadingSpinner />;

  if (publishedOrdersError) {
    return <div>Error loading data</div>;
  }

  const orders = filteredLoads ? filteredLoads : slicedLoads;
  if (!publishedOrders) return;
  return (
    <>
      <OrdersOptions ref={searchOrderRef} onSubmit={handleSubmit} />
      <table>
        <OrdersColumns columns={publishedOrdersColumns} />
        <tbody className={styles['orders-list']}>
          {orders?.map((order) => {
            return (
              <PublishedOrderItem key={order.id} order={order}>
                <td className={styles.buttons}>
                  <button onClick={() => removeOrderHandler(order.id)} className={styles.delete}>
                    <BsTrash />
                  </button>
                </td>
              </PublishedOrderItem>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Paginate<Load> setSlicedItems={setSlicedLoads} data={publishedOrders} />
      </div>
    </>
  );
};
