import { menuLinks, infoLinks } from '../asideMenuData';
import logo from '../../../assets/logo.svg';
import styles from './AsideMenu.module.scss';
import Links from '../../../common/Links';

export const AsideMenu = ({ showMenu }: { showMenu: boolean }) => {
  return (
    <nav className={!showMenu ? `${styles.navbar} ${styles.hidden}` : styles.navbar}>
      <img className={!showMenu ? styles.hidden : ''} src={logo} />
      <div className={showMenu ? styles['main-links'] : `${styles['main-links']} ${styles.hidden}`}>
        <Links data={menuLinks} />
      </div>
      <div className={showMenu ? styles['info-links'] : `${styles['main-links']} ${styles.hidden}`}>
        <Links activeMode={false} data={infoLinks} />
      </div>
      <p className={styles.author}>@made by m.kluska</p>
    </nav>
  );
};
