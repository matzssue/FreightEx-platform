import { ReactNode } from 'react';
import logo from '../../assets/logo.svg';
import styles from './AuthFormWrapper.module.scss';

type AuthFormWrapper = {
  children: ReactNode;
  hideLogo?: boolean;
};

export const AuthFormWrapper = ({ children, hideLogo = false }: AuthFormWrapper) => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles['background-image']} />
        <div className={styles['form-container']}>
          <img
            alt='logo'
            className={`${styles.logo} ${hideLogo ? styles.hidden : ''}`}
            src={logo}
          />
          {children}
        </div>
      </div>
    </section>
  );
};
