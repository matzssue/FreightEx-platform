import { NavLink } from 'react-router-dom';
import styles from './LinkButton.module.scss';
import { ReactNode } from 'react';

type LinkButtonProps = {
  link: string;
  children: ReactNode;
  mode: 'back' | 'next';
};

export const LinkButton = ({ link, children, mode }: LinkButtonProps) => {
  return (
    <NavLink
      className={`${styles.navlink} ${mode === 'back' ? styles.back : styles.next}`}
      to={link}
    >
      {children}
    </NavLink>
  );
};
