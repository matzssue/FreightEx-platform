import { ReactNode } from 'react';

import styles from './VehicleCardWrapper.module.scss';
export const VehicleCardWrapper = ({ children }: { children: ReactNode }) => (
  <div className={styles['vehicle-container']}>
    <div className={styles['card-bg']} />
    {children}
  </div>
);
