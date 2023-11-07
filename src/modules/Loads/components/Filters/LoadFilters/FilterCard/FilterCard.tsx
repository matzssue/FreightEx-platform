import { ReactNode } from 'react';

import { Title } from '../../../../../../common/Title/Title';

import styles from './FilterCard.module.scss';
type FilterCard = {
  children: ReactNode;
  filterName: string;
  row?: boolean;
};

export const FilterCard = ({ children, filterName, row = false }: FilterCard) => (
  <div className={styles.filter}>
    <Title title={filterName} />
    {row ? <div className={styles.row}>{children}</div> : children}
  </div>
);
