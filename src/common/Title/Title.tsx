import { ReactNode } from 'react';

import styles from './Title.module.scss';

type FilterTitleProps = {
  icon?: ReactNode;
  title: string;
};

export const Title = ({ title, icon }: FilterTitleProps) => (
  <p className={styles.title}>
    {title} {icon}
  </p>
);
