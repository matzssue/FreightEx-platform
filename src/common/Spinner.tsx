import CircularProgress from '@mui/material/CircularProgress';
import styles from './Spiner.module.scss';
export const LoadingSpinner = () => {
  return (
    <div className={styles['spinner-container']}>
      <CircularProgress />
    </div>
  );
};
