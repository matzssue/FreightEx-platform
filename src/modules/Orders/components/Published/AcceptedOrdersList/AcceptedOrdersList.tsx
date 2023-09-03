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
import { AcceptedLoad, Load } from 'src/utils/api/supabase/types';
import { OrdersOptions } from '../../OrdersOptions/OrdersOptions';

export const AcceptedOrdersList = () => {
  const { userId } = useUserContext();
  const { changeLoadsPerPage } = usePaginationContext();
  const searchOrderRef = useRef<HTMLInputElement>(null);
  const [slicedLoads, setSlicedLoad] = useState<Load[] | null>(null);
  const [filteredLoads, setFilteredLoads] = useState<Load[] | null>(null);

  const {
    data: acceptedOrders,
    isLoading: isAcceptedOrdersLoading,
    error: acceptedOrdersError,
  } = useQuery(['accepted'], async () => await getAcceptedOrders(userId));

  useEffect(() => {
    changeLoadsPerPage(12);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchOrderRef?.current?.value;

    if (searchValue && slicedLoads) {
      const filteredOrders = slicedLoads.filter((order) => order.id.toString() === searchValue);
      setFilteredLoads(filteredOrders);
    }
    if (!searchValue) setFilteredLoads(null);
  };

  if (isAcceptedOrdersLoading) return <LoadingSpinner />;

  if (acceptedOrdersError) {
    return <div>Error loading data</div>;
  }

  if (!acceptedOrders) return;
  const orders = filteredLoads ? filteredLoads : slicedLoads;
  return (
    <>
      <OrdersOptions ref={searchOrderRef} onSubmit={handleSubmit} />
      <div>
        <OrdersColumns
          gridColumns='0.2fr 2fr 0.6fr 0.8fr 1fr 0.5fr'
          columns={acceptedOrdersColumns}
        />
        <ul className={styles['orders-list']}>
          {orders?.map((order) => {
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
        <Paginate<AcceptedLoad> setSlicedItems={setSlicedLoad} data={acceptedOrders} />
      </div>
    </>
  );
};
