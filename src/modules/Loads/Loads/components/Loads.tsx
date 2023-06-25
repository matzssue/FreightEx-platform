import styles from './Loads.module.scss';
import { List } from '../../../../common/Lists/List';
import { useEffect } from 'react';
import { sortData } from '../loadData';
import { Load } from './Load';

export const Loads = () => {
  return (
    <div>
      <div className={styles['sort-list']}>
        <List list={sortData} />
      </div>
      <div className={styles.loads}>
        <Load />
        <Load />
        <Load />
        <Load />
        <Load />
        <Load />
        <Load />
      </div>
    </div>
  );
};
