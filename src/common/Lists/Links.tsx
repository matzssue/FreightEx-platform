import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';

import styles from './Links.module.scss';
type Link = {
  disabled?: boolean;
  icon?: ReactNode;
  link: string;
  linkName: string;
};

type LinksProps = {
  activeMode?: boolean;
  data: Link[];
  hidden?: boolean;
};

const Links = ({ data, activeMode = true, hidden }: LinksProps) => (
  <ul className={styles['list-container']}>
    {data.map((link) => (
      <li key={link.linkName}>
        {!link.disabled ? (
          <NavLink
            to={link.link}
            className={({ isActive }) => (isActive && activeMode ? styles.active : '')}
          >
            {link.icon && <span className={styles.icon}>{link.icon}</span>}
            <span
              className={hidden ? `${styles['link-name']} ${styles.hidden}` : styles['link-name']}
            >
              {link.linkName}
            </span>
          </NavLink>
        ) : (
          <Tooltip placement='right-start' title='coming soon'>
            <button className={styles.disabled}>
              {link.icon}{' '}
              <span
                className={hidden ? `${styles['link-name']} ${styles.hidden}` : styles['link-name']}
              >
                {link.linkName}
              </span>
            </button>
          </Tooltip>
        )}
      </li>
    ))}
  </ul>
);

export default Links;
