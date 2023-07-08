import styles from './FilterCard.module.scss';
import { ReactNode } from 'react';
type FilterCard = {
  children: ReactNode;
  filterName: string;
  topLeftLabel: string;
  topRightLabel?: string;
};

export const FilterCard = ({ children, filterName, topLeftLabel, topRightLabel }: FilterCard) => {
  return (
    <div className={styles.filter}>
      <span className={styles['filter-name']}>{filterName}</span>
      <div>{children}</div>
    </div>
  );
};
