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
};

const Links = ({ data, activeMode = true }: LinksProps) => {
  return (
    <ul>
      {data.map((link) => (
        <li key={link.linkName}>
          <NavLink
            to={link.link}
            className={({ isActive }) => (isActive && activeMode ? styles.active : '')}
          >
            {link.icon} {link.linkName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Links;
