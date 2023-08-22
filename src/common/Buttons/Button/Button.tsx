import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  type?: 'submit' | 'button';
  children: ReactNode;
  mode?: 'submit' | 'delete';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ onClick, type = 'submit', children, mode = 'submit' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${mode === 'delete' ? styles.delete : styles.submit}`}
      type={type}
    >
      {children}
    </button>
  );
};
