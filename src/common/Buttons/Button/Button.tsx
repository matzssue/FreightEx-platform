import { MouseEventHandler, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  children: ReactNode;
  mode?: 'submit' | 'delete';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button';
};

export const Button = ({ onClick, type = 'submit', children, mode = 'submit' }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${mode === 'delete' ? styles.delete : styles.submit}`}
    type={type}
  >
    {children}
  </button>
);
