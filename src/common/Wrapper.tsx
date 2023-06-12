import { ReactNode } from 'react';
import styles from './Wrapper.module.scss';

const Wrapper = ({ children, showMenu }: { children?: ReactNode; showMenu: boolean }) => {
  return (
    <div className={!showMenu ? `${styles.loads} ${styles.hidden}` : styles.loads}>{children}</div>
  );
};
export default Wrapper;
