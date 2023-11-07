import CircularProgress from '@mui/material/CircularProgress';

import styles from './LoadingSpiner.module.scss';
export const LoadingSpinner = () => (
  <div className={styles['spinner-container']}>
    <CircularProgress />
  </div>
);
