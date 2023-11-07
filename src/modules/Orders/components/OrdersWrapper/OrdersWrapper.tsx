import { ReactNode } from 'react';

import styles from './OrdersWrapper.module.scss';

export const OrdersWrapper = ({ children }: { children: ReactNode }) => (
  <div className={styles['orders-wrapper']}>{children}</div>
);
