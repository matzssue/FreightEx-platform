import { menuLinks, infoLinks } from "../asideMenuData";
import logo from "../../../assets/logo.svg";
import styles from "./AsideMenu.module.scss";
import Links from "../../../common/Links";
export const AsideMenu = () => {
  return (
    <nav className={styles.navbar}>
      <img src={logo} />
      <div className={styles["main-links"]}>
        <Links data={menuLinks} />
      </div>
      <div className={styles["info-links"]}>
        <Links data={infoLinks} />
      </div>
      <p className={styles.author}>@made by m.kluska</p>
    </nav>
  );
};
