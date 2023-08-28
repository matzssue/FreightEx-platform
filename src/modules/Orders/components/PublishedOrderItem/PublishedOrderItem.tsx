import styles from './PublishedOrderItem.module.scss';
import { BsTrash } from 'react-icons/bs';
import { Load } from 'src/utils/api/supabase/types';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useDeleteOrder } from '../../hooks/useDeleteOrder';

export const PublishedOrderItem = ({
  order,
  ordersType = 'published',
}: {
  order: Load;
  ordersType?: 'published' | 'accepted';
}) => {
  const deleteOrderMutation = useDeleteOrder();
  console.log('inorder', order);
  const removeOrderHandler = (id: string) => {
    deleteOrderMutation.mutate(id);
  };
  return (
    <tr className={styles.order} key={order.id}>
      <td className={styles.route}>
        <span>
          {order.loadingAddress.country}, {order.loadingAddress.postal_code}{' '}
          {order.loadingAddress.city}
        </span>
        <HiOutlineArrowNarrowRight />
        <span>
          {order.unloadingAddress.country}, {order.unloadingAddress.postal_code}{' '}
          {order.unloadingAddress.city}
        </span>
      </td>
      <td>
        {order.price} {order.currency}
      </td>
      <td>
        {order.cargoLength}L {order.cargoWeight}T{' '}
        {Object.keys(order.vehicleTypes)
          .filter((key) => order.vehicleTypes[key])
          .join(', ')}
      </td>
      <td>
        {order.loadingDate} <HiOutlineArrowNarrowRight /> {order.unloadingDate}
      </td>
      {ordersType === 'published' && (
        <td className={styles.buttons}>
          <button onClick={() => removeOrderHandler(order.id)} className={styles.delete}>
            <BsTrash />
          </button>
        </td>
      )}
      {ordersType === 'accepted' && (
        <td>
          {order.user.name} {order.user.surname}, {order.company.name}
        </td>
      )}
    </tr>
  );
};
