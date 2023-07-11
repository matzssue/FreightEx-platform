import { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Wrapper from './common/Wrapper';
import { AsideMenu } from './modules/Home/AsideMenu/components/AsideMenu';
import { UserBar } from './modules/UserBar/components/UserBar';

import { Home } from './Views/Home';
import { News } from './Views/News';
import { Loader } from '@googlemaps/js-api-loader';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Loads } from './modules/Loads/Loads/components/Loads';

// const loader = new Loader({
//   apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
//   version: 'weekly',
// });

// loader.load().then(async () => {
//   const data = (await google.maps.importLibrary('places')) as google.maps.MapsLibrary;
//   console.log('test', data);
// });

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

function App() {
  const [showMenu, setShowMenu] = useState<boolean>(true);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools position='top-right' initialIsOpen={false} />
        )}
        <Suspense fallback='Loading...'>
          <BrowserRouter>
            <UserBar setShowMenu={setShowMenu} />
            <div className={'box'}>
              <AsideMenu showMenu={showMenu} />
              <Wrapper showMenu={showMenu}>
                <Routes>
                  <Route path='/loads'>
                    <Route index element={<Home />} />
                    <Route path='/loads/:id'>
                      <Route index element={<Home />} />
                      <Route element={<Home />} path='/loads/:id/:loadId' />
                    </Route>
                  </Route>
                  <Route element={<News />} path='/news' />
                </Routes>
              </Wrapper>
            </div>
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;
