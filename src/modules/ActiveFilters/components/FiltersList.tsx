import styles from './FiltersList.module.scss';
export const FilterList = () => {
  const filters = ['Zielona Góra', 'Warszawa', 'Gorzow'];
  return (
    <div className={styles['list-container']}>
      {filters.map((filter, i) => (
        <span key={i}>{filter}</span>
      ))}
    </div>
  );
};
