import styles from './Loads.module.scss';
import { List } from '../../../../common/Lists/List';
import { useEffect } from 'react';
import { sortData } from '../loadData';
import { Load } from './Load';
import { getAllLoads } from '../../../../utils/api/supabase/load';
import { useQuery } from '@tanstack/react-query';
export const Loads = () => {
  const { data, isLoading } = useQuery(['orders'], async () => await getAllLoads());
  console.log(data);
  return (
    <div>
      <div className={styles['sort-list']}>
        <List list={sortData} />
      </div>
      <div className={styles.loads}>
        {isLoading ? (
          <p>loading</p>
        ) : (
          data?.map((load) => (
            <Load
              key={load.id}
              loadingCity={load.loadingAddress.city}
              loadingPostCode={load.loadingAddress.postal_code}
              unloadingCity={load.unloadingAddress.city}
              unloadingPostCode={load.unloadingAddress.postal_code}
              {...load}
            />
          ))
        )}
        {/*       
        <Load />
        <Load />
        <Load />
        <Load />
        <Load />
        <Load />
        <Load /> */}
      </div>
    </div>
  );
};
