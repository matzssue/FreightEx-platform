import logo from '../../../../assets/logo.svg';

import styles from './Loader.module.scss';
export const Loader = () => (
  <div className={styles.container}>
    <img className={styles.logo} alt='logo' src={logo} />
    <div className={styles.loading}>
      <span className={styles['loading-text']}>Loading</span>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  </div>
);
