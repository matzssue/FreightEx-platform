import styles from './PublishedOrdersList.module.scss';
import { PublishedOrderItem } from '../PublishedOrderItem/PublishedOrderItem';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getPublishedOrders } from 'src/utils/api/supabase/Orders/getPublishedOrders';
import { OrdersColumns } from '../OrdersColumns/OrdersColumns';
import { publishedOrdersColumns, acceptedOrdersColumns } from '../../constants/ordersColumns';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { getAcceptedOrders } from 'src/utils/api/supabase/Orders/getAcceptedOrders';
import { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { Paginate } from 'src/modules/Loads/components/Pagination/Pagination';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { Load } from 'src/utils/api/supabase/types';

type OrdersType = 'published' | 'accepted';

export const PublishedOrdersList = () => {
  const { userId } = useUserContext();
  const { changeLoadsPerPage } = usePaginationContext();

  const [ordersType, setOrdersType] = useState<OrdersType>('published');
  const [slicedLoads, setSlicedLoad] = useState<Load[]>();

  const { data: publishedOrders, isLoading: isPublishedOrdersLoading } = useQuery(
    ['published'],
    async () => await getPublishedOrders(userId),
    {
      enabled: !!userId,
    },
  );
  const { data: acceptedOrders, isLoading: isAcceptedOrdersLoading } = useQuery(
    ['accepted'],
    async () => await getAcceptedOrders(userId),
  );
  useEffect(() => {
    changeLoadsPerPage(12);
  }, []);

  const selectOrdersHandler = (event: { target: { value: string } }) => {
    if (event.target.value === 'published' || event.target.value === 'accepted') {
      setOrdersType(event.target.value);
    }
  };

  if (isPublishedOrdersLoading || isAcceptedOrdersLoading) return <LoadingSpinner />;
  const orders = ordersType === 'published' ? publishedOrders : acceptedOrders;
  if (!orders) return;
  return (
    <>
      <div className={styles.options}>
        <form>
          <label>Search order id</label>
          <input type='search' />
        </form>
        <FormControl className={styles.select}>
          <label>Select type of orders</label>
          <Select onChange={selectOrdersHandler} defaultValue={'published'}>
            <MenuItem value={'published'}>Published</MenuItem>
            <MenuItem value={'accepted'}>Accepted</MenuItem>
          </Select>
        </FormControl>
      </div>
      <table>
        <OrdersColumns
          columns={ordersType === 'published' ? publishedOrdersColumns : acceptedOrdersColumns}
        />
        <tbody className={styles['orders-list']}>
          {slicedLoads ? (
            slicedLoads?.map((order) => {
              return <PublishedOrderItem ordersType={ordersType} key={order.id} order={order} />;
            })
          ) : (
            <p>No loads found</p>
          )}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Paginate setSlicedLoads={setSlicedLoad} data={orders} />
      </div>
    </>
  );
};
