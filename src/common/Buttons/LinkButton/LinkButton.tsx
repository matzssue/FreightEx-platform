import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './LinkButton.module.scss';

type LinkButtonProps = {
  children: ReactNode;
  link: string;
  mode: 'back' | 'next';
};

export const LinkButton = ({ link, children, mode }: LinkButtonProps) => (
  <NavLink className={`${styles.navlink} ${mode === 'back' ? styles.back : styles.next}`} to={link}>
    {children}
  </NavLink>
);
