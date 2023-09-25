import { NavLink } from 'react-router-dom';
import styles from './Error404.module.scss';
import { BiError } from 'react-icons/bi';
export const Error404 = () => {
  return (
    <div className={styles['error-container']}>
      <span className={styles['error-icon']}>
        <BiError />
      </span>
      <h1>404</h1>
      <p>Page not found </p>
      <NavLink to={'/'}>Back to main page</NavLink>
    </div>
  );
};
