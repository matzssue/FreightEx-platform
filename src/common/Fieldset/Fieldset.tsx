import { ReactNode } from 'react';

import styles from './Fieldset.module.scss';

export const Fieldset = ({ children }: { children: ReactNode }) => (
  <fieldset className={styles['fieldset-inputs']}>{children}</fieldset>
);
