import { ReactNode } from 'react';
import styles from './Links.module.scss';
import { NavLink } from 'react-router-dom';
type Link = {
  linkName: string;
  link: string;
  icon?: ReactNode;
};

type LinksProps = {
  data: Link[];
  activeMode?: boolean;
  hidden?: boolean;
};

const Links = ({ data, activeMode = true, hidden }: LinksProps) => {
  return (
    <ul className={styles['list-container']}>
      {data.map((link) => (
        <li key={link.linkName}>
          <NavLink
            to={link.link}
            className={({ isActive }) => (isActive && activeMode ? styles.active : '')}
          >
            {link.icon && <span className={styles.icon}>{link.icon}</span>}
            <span className={hidden ? styles.hidden : ''}>{link.linkName}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Links;
