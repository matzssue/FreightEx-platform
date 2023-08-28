import { ReactNode } from 'react';
import styles from './OrdersWrapper.module.scss';

export const OrdersWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={styles['orders-wrapper']}>{children}</div>;
};
