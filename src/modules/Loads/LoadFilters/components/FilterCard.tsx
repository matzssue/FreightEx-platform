import styles from './FilterCard.module.scss';
import { ReactNode } from 'react';
type FilterCard = {
  children: ReactNode;
  filterName: string;
  topLeftLabel: string;
  topRightLabel: string;
};

export const FilterCard = ({ children, filterName, topLeftLabel, topRightLabel }: FilterCard) => {
  return (
    <div className={styles.filter}>
      <span className={styles['filter-name']}>{filterName}</span>
      <span className={styles.min}>{topLeftLabel}</span>
      <span className={styles.max}>{topRightLabel}</span>
      <div className={styles.inputs}>{children}</div>
    </div>
  );
};
