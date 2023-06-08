import { AsideMenu } from "./modules/AsideMenu/components/AsideMenu";
import { UserBar } from "./modules/UserBar/UserBar";
import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loads from "./modules/Loads";
function App() {
  return (
    <>
      <BrowserRouter>
        <UserBar />
        <div className={styles.box}>
          <AsideMenu />

          <Routes>
            <Route element={<Loads />} path="/loads" />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
