import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Wrapper from './common/Wrapper';
import { AsideMenu } from './modules/Home/AsideMenu/components/AsideMenu';
import { UserBar } from './modules/UserBar/components/UserBar';
import { FiltersMenu } from './modules/Loads/LoadFilters/components/FiltersMenu';
import { ActiveFilters } from './modules/Loads/ActiveFilters/components/ActiveFilters';
import { Loads } from './modules/Loads/Loads/components/Loads';
import { FilterDetails } from './modules/Loads/ActiveFilters/components/FiltersDetails';
import { NewsCard } from './modules/News/NewsCard/components/NewsCard';
import { AllNews } from './modules/News/NewsCard/components/AllNews';
import { Home } from './Views/Home';
import { News } from './Views/News';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  version: 'weekly',
});

loader.load().then(async () => {
  const data = (await google.maps.importLibrary('places')) as google.maps.MapsLibrary;
  console.log('test', data);
  // map = new Map(document.getElementById("map") as HTMLElement, {
  //   center: { lat: -34.397, lng: 150.644 },
  //   zoom: 8,
  // });
});

function App() {
  const [showMenu, setShowMenu] = useState<boolean>(true);

  return (
    <>
      <BrowserRouter>
        <UserBar setShowMenu={setShowMenu} />
        <div className={styles.box}>
          <AsideMenu showMenu={showMenu} />
          <Wrapper showMenu={showMenu}>
            <Routes>
              <Route element={<Home />} path='/loads' />
              <Route element={<News />} path='/news' />
            </Routes>
          </Wrapper>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
