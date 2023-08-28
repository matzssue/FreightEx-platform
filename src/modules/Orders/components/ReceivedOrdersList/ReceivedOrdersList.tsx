import { receivedOrdersColumns } from '../../constants/ordersColumns';
import { OrdersColumns } from '../OrdersColumns/OrdersColumns';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getReceivedOrders } from 'src/utils/api/supabase/Orders/getReceivedOrders';
import { ReceivedOrderItem } from '../ReceivedOrderItem/ReceivedOrderItem';

export const ReceivedOrdersList = () => {
  const { userId } = useUserContext();
  const { data: orders } = useQuery(['received'], async () => await getReceivedOrders(userId), {
    enabled: !!userId,
  });
  console.log(orders);
  if (!orders) return;

  return (
    <>
      <div>
        <form>
          <label>Search order id</label>
          <input type='search' />
        </form>
      </div>
      <table>
        <OrdersColumns columns={receivedOrdersColumns} />
        <tbody>
          {orders.map((order) => {
            return <ReceivedOrderItem key={order.id} order={order} />;
          })}
        </tbody>
      </table>
    </>
  );
};
