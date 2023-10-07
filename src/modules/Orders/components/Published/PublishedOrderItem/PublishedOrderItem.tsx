import styles from './PublishedOrderItem.module.scss';
import { Load } from 'src/utils/api/supabase/types';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { ReactNode } from 'react';

export const PublishedOrderItem = ({ order, children }: { order: Load; children?: ReactNode }) => {
  return (
    <li className={styles.order} key={order.id}>
      <span className={styles['order-id']}>{order.id}</span>
      <span className={styles['loading-address']}>
        {order.loadingAddress.country}, {order.loadingAddress.postal_code}{' '}
        {order.loadingAddress.city} {<HiOutlineArrowNarrowRight />}
      </span>
      <span className={styles['unloading-address']}>
        {order.unloadingAddress.country}, {order.unloadingAddress.postal_code}{' '}
        {order.unloadingAddress.city}
      </span>
      <span className={styles.payment}>
        {order.price} {order.currency}
      </span>
      <span className={styles.cargo}>
        {order.cargoLength}L {order.cargoWeight}T{' '}
        {Object.keys(order.vehicleTypes)
          .filter((key) => order.vehicleTypes[key])
          .join(', ')}
      </span>
      <span className={styles.date}>
        {order.loadingDate} <HiOutlineArrowNarrowRight /> {order.unloadingDate}
      </span>
      {children}
    </li>
  );
};
