import styles from './PublishedOrderItem.module.scss';
import { Load } from 'src/utils/api/supabase/types';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { ReactNode } from 'react';

export const PublishedOrderItem = ({ order, children }: { order: Load; children?: ReactNode }) => {
  return (
    <tr className={styles.order} key={order.id}>
      <td>{order.id}</td>
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
      {children}
    </tr>
  );
};
