import { ReactNode } from 'react';

import styles from './Wrapper.module.scss';

const Wrapper = ({ children, showMenu }: { children?: ReactNode; showMenu: boolean }) => (
  <div className={!showMenu ? `${styles.container} ${styles.hidden}` : styles.container}>
    {children}
  </div>
);
export default Wrapper;
