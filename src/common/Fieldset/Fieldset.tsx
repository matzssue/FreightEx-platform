import { ReactNode } from 'react';
import styles from './Fieldset.module.scss';

export const Fieldset = ({ children }: { children: ReactNode }) => {
  return <fieldset className={styles['fieldset-inputs']}>{children}</fieldset>;
};
