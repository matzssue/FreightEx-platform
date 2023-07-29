import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import { Home } from './Views/Home';
import { News } from './Views/News';

import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoadDetails } from './modules/Loads/LoadDetails/LoadDetails';
import { LoginForm } from './modules/Auth/LoginForm';
import { RegisterForm } from './modules/Auth/RegisterForm';
import ErrorBoundary from './utils/helpers/ErrorBoundary';

import Login from './modules/Auth/Login';
import { UserContextProvider } from './store/contexts/UserContext';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools position='top-right' initialIsOpen={false} />
        )} */}
        <ErrorBoundary>
          <BrowserRouter>
            <UserContextProvider>
              <Suspense fallback='Loading...'>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/login' element={<LoginForm />} />
                  <Route path='/register' element={<RegisterForm />} />
                  <Route path='loads'>
                    <Route index element={<Home />} />
                    <Route path=':loadId'>
                      <Route
                        index
                        element={
                          <>
                            <Home />
                            <LoadDetails />
                          </>
                        }
                      />
                    </Route>
                    <Route path='filters'>
                      <Route element={<Home />} path=':filterId' />
                      <Route
                        element={
                          <>
                            <Home />
                            <LoadDetails />
                          </>
                        }
                        path=':filterId/:loadId'
                      />
                    </Route>
                  </Route>
                  <Route element={<News />} path='/news' />
                </Routes>
              </Suspense>
            </UserContextProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
