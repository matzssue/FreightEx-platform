import { ReactNode } from 'react';
import styles from './Title.module.scss';

type FilterTitleProps = {
  title: string;
  icon?: ReactNode;
};

export const Title = ({ title, icon }: FilterTitleProps) => {
  return (
    <p className={styles.title}>
      {title} {icon}
    </p>
  );
};
