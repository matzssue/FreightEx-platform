import { menuLinks, infoLinks } from '../../constants/asideMenuData';
import logo from 'src/assets/logo.svg';
import styles from './AsideMenu.module.scss';
import Links from '../../../../common/Lists/Links';

export const AsideMenu = ({ showMenu }: { showMenu: boolean }) => {
  return (
    <nav className={showMenu ? styles.navbar : `${styles.navbar} ${styles.hidden}`}>
      <div className={styles['nav-container']}>
        <img className={showMenu ? styles.logo : `${styles.logo} ${styles.hidden}`} src={logo} />
        <div
          className={showMenu ? styles['main-links'] : `${styles['main-links']} ${styles.hidden}`}
        >
          <Links hidden={!showMenu} data={menuLinks} />
        </div>
        <p className={showMenu ? styles.author : `${styles.author} ${styles.hidden}`}>
          @made by m.kluska
        </p>
      </div>
    </nav>
  );
};
