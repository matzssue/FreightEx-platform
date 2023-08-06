import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { Home } from './Views/Home';

import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoadDetails } from './modules/Loads/LoadDetails/LoadDetails';
import { LoginForm } from './modules/Auth/LoginForm';
import { RegisterForm } from './modules/Auth/RegisterForm';
import ErrorBoundary from './utils/helpers/ErrorBoundary';

import Login from './modules/Auth/ProtectedLoader';
import { UserContextProvider } from './store/contexts/UserContext';

import { Account } from './Views/Account';
import { PaginationContextProvider } from './store/contexts/PaginationContext';

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
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools position='top-right' initialIsOpen={false} />
        )}
        <ErrorBoundary>
          <BrowserRouter>
            <UserContextProvider>
              <PaginationContextProvider>
                <Suspense fallback='Loading...'>
                  <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path='account'>
                      <Route index element={<Navigate to=':accountId' />} />
                      <Route path=':accountId' element={<Account />} />
                    </Route>
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
                  </Routes>
                </Suspense>
              </PaginationContextProvider>
            </UserContextProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
