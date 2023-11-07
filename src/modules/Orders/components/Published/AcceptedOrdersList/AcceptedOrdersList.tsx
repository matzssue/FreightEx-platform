import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { Paginate } from 'src/common/Pagination/Pagination';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { useUserContext } from 'src/store/contexts/UserContext';
import { getAcceptedOrders } from 'src/utils/api/supabase/Orders/getAcceptedOrders';
import { Load } from 'src/utils/api/supabase/types';

import { acceptedOrdersColumns } from '../../../constants/ordersColumns';
import { OrdersColumns } from '../../OrdersColumns/OrdersColumns';
import { OrdersOptions } from '../../OrdersOptions/OrdersOptions';
import { PublishedOrderItem } from '../PublishedOrderItem/PublishedOrderItem';

import styles from './AcceptedOrdersList.module.scss';

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
    changeItemsPerPage(8);
    changePage(1);
  }, []);

  const {
    data: acceptedOrders,
    isLoading: isAcceptedOrdersLoading,
    error: acceptedOrdersError,
  } = useQuery(
    ['accepted', currentPage, itemsPerPage],
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

  return (
    <>
      <OrdersOptions ref={searchOrderRef} onSubmit={handleSubmit} />
      <div>
        <OrdersColumns
          gridColumns='0.2fr 1.8fr 0.4fr 0.4fr 0.8fr 0.7fr'
          columns={acceptedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders?.orders?.map((order) => (
            <PublishedOrderItem key={order.id} order={order}>
              <span>
                {order.user.name} {order.user.surname}, {order.company.name}
              </span>
            </PublishedOrderItem>
          ))}
        </ul>
        {orders?.orders?.length === 0 && <p>No orders found</p>}
      </div>
      <div className={styles.pagination}>
        <Paginate lastPage={orders?.totalPages ? orders.totalPages : 0} />
      </div>
    </>
  );
};
