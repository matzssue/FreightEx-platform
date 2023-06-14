import { Avatar } from '@mui/material';
import styles from './Loads.module.scss';
import { SortList } from './SortList';
import { sortData } from '../SortData';
import { Load } from './Load';
export const Loads = () => {
  return (
    <div>
      <div className={styles['sort-list']}>
        <SortList list={sortData} />
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
