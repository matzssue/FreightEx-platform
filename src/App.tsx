import { AsideMenu } from "./modules/AsideMenu/components/AsideMenu";
import { UserBar } from "./modules/UserBar/UserBar";
import styles from "./App.module.scss";
function App() {
  return (
    <>
      <UserBar />
      <div className={styles.box}>
        <AsideMenu />
        <main></main>
      </div>
    </>
  );
}

export default App;
