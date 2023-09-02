import { ReactNode } from 'react';
import styles from './VehicleCardWrapper.module.scss';
export const VehicleCardWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={styles['vehicle-container']}>{children}</div>;
};
