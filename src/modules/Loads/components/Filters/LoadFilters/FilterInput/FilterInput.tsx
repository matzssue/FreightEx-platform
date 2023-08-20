import styles from './FilterInput.module.scss';

export const FilterInput = ({ children, label }) => {
  return (
    <div className={styles['input-container']}>
      <label>{label}</label>
      {children}
    </div>
  );
};
