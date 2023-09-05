import styles from './AcceptedOrdersList.module.scss';
import { PublishedOrderItem } from '../PublishedOrderItem/PublishedOrderItem';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { acceptedOrdersColumns } from '../../../constants/ordersColumns';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { getAcceptedOrders } from 'src/utils/api/supabase/Orders/getAcceptedOrders';
import { useEffect, useState, useRef } from 'react';
import { Paginate } from 'src/common/Pagination/Pagination';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { Load } from 'src/utils/api/supabase/types';
import { OrdersOptions } from '../../OrdersOptions/OrdersOptions';

type FilteredLoads = {
  orders: Load[] | null;
  totalPages: number | null;
};

export const AcceptedOrdersList = () => {
  const { userId } = useUserContext();
  const { changeItemsPerPage, itemsPerPage, currentPage, changePage } = usePaginationContext();
  const searchOrderRef = useRef<HTMLInputElement>(null);
  const [filteredLoads, setFilteredLoads] = useState<FilteredLoads>({
    orders: null,
    totalPages: null,
  });

  useEffect(() => {
    changeItemsPerPage(12);
    changePage(1);
  }, []);

  const {
    data: acceptedOrders,
    isLoading: isAcceptedOrdersLoading,
    error: acceptedOrdersError,
  } = useQuery(
    ['accepted'],
    async () => await getAcceptedOrders(userId, currentPage, itemsPerPage),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchOrderRef?.current?.value;

    if (searchValue && acceptedOrders) {
      const filteredOrders = {
        orders: acceptedOrders.orders.filter((order) => order.id.toString() === searchValue),
        totalPages: acceptedOrders.totalPages,
      };
      setFilteredLoads(filteredOrders);
    }
    if (!searchValue) setFilteredLoads({ orders: null, totalPages: null });
  };

  if (isAcceptedOrdersLoading) return <LoadingSpinner />;

  if (acceptedOrdersError) {
    return <div>Error loading data</div>;
  }

  const orders = filteredLoads.orders ? filteredLoads : acceptedOrders;
  if (!orders?.orders || !orders?.totalPages) return;
  return (
    <>
      <OrdersOptions ref={searchOrderRef} onSubmit={handleSubmit} />
      <div>
        <OrdersColumns
          gridColumns='0.2fr 2fr 0.6fr 0.8fr 1fr 0.5fr'
          columns={acceptedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders.orders?.map((order) => {
            return (
              <PublishedOrderItem key={order.id} order={order}>
                <li>
                  {order.user.name} {order.user.surname}, {order.company.name}
                </li>
              </PublishedOrderItem>
            );
          })}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders.totalPages} />
      </div>
    </>
  );
};
