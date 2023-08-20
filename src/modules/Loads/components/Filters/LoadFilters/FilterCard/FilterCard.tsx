import styles from './FilterCard.module.scss';
import { ReactNode } from 'react';
import { Title } from '../../../../../../common/Title/Title';
type FilterCard = {
  children: ReactNode;
  filterName: string;
  row?: boolean;
};

export const FilterCard = ({ children, filterName, row = false }: FilterCard) => {
  return (
    <div className={styles.filter}>
      <Title title={filterName} />
      {row ? <div className={styles.row}>{children}</div> : children}
    </div>
  );
};
