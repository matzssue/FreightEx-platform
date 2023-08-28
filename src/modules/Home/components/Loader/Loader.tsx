import styles from './Loader.module.scss';
import logo from '../../../../assets/logo.svg';
export const Loader = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} />
      <div className={styles.loading}>
        <span className={styles['loading-text']}>Loading</span>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
};
