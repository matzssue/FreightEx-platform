import styles from './ActiveFilters.module.scss';
export const ActiveFilters = () => {
  const filters = ['Zielona Góra', 'Warszawa', 'Gorzow'];
  return (
    <div className={styles['list-container']}>
      {filters.map((filter, i) => (
        <span key={i}>{filter}</span>
      ))}
    </div>
  );
};
