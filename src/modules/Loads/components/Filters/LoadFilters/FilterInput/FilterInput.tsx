import { ReactNode } from 'react';
import styles from './FilterInput.module.scss';

export const FilterInput = ({ children, label }: { children: ReactNode; label: string }) => {
  return (
    <div className={styles['input-container']}>
      <label>{label}</label>
      {children}
    </div>
  );
};
