import { menuLinks, infoLinks } from '../asideMenuData';
import logo from '../../../../assets/logo.svg';
import styles from './AsideMenu.module.scss';
import Links from '../../../../common/Links';

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
        <div
          className={showMenu ? styles['info-links'] : `${styles['info-links']} ${styles.hidden}`}
        >
          <Links activeMode={false} data={infoLinks} />
        </div>
        <p className={showMenu ? styles.author : `${styles.author} ${styles.hidden}`}>
          @made by m.kluska
        </p>
      </div>
    </nav>
  );
};
