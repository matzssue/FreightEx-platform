import styles from './FilterCard.module.scss';
import { ReactNode } from 'react';
import { Title } from '../../../../../../common/Title/Title';
type FilterCard = {
  children: ReactNode;
  filterName: string;
};

export const FilterCard = ({ children, filterName }: FilterCard) => {
  return (
    <div className={styles.filter}>
      <Title title={filterName} />
      <div>{children}</div>
    </div>
  );
};
