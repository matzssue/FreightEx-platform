import { ReactNode, SyntheticEvent } from 'react';
import logo from '../assets/logo.svg';
import styles from './AuthFormWrapper.module.scss';

type AuthFormWrapper = {
  children: ReactNode;
  onSubmit: (e: SyntheticEvent) => void;
  hideLogo?: boolean;
};

export const AuthFormWrapper = ({ children, onSubmit, hideLogo = false }: AuthFormWrapper) => {
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
          <form onSubmit={onSubmit} className={styles.form}>
            {children}
          </form>
        </div>
      </div>
    </section>
  );
};
