import { ReactNode } from 'react';
import styles from './FilterInput.module.scss';

export const FilterInput = ({
  children,
  label,
  labelId,
}: {
  children: ReactNode;
  label: string;
  labelId: string;
}) => {
  return (
    <div className={styles['input-container']}>
      <label htmlFor={labelId}>{label}</label>
      {children}
    </div>
  );
};
