import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './utils/helpers/ErrorBoundary';
import { Home } from './Pages/Loads/Home';
import { Account } from './Pages/Account/Account';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoginForm } from './modules/Auth/components/LoginBox/LoginForm';
import { RegisterForm } from './modules/Auth/components/RegisterBox/RegisterForm';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from './store/contexts/UserContext';
import { PaginationContextProvider } from './store/contexts/PaginationContext';
import { Vehicles } from './Pages/Fleet/Vehicles';
import { AddVehicle } from './Pages/Fleet/AddVehicle';
import { EditVehicle } from './Pages/Fleet/EditVehicle';
import { NotificationContextProvider } from './store/contexts/NotficationContext';
import { Orders } from './Pages/Orders/Orders';
import { PublishedOrders } from './Pages/Orders/PublishedOrders';
import { ReceivedOrders } from './Pages/Orders/ReceivedOrders';
import { LoadDetailsPage } from './Pages/Loads/LoadDetailsPage';
import { AcceptedOrders } from './Pages/Orders/AcceptedOrders';

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
                <NotificationContextProvider>
                  <ToastContainer
                    position='top-right'
                    autoClose={4000}
                    limit={2}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light'
                  />
                  <Suspense fallback='Loading...'>
                    <Routes>
                      <Route path='/' element={<Navigate to={'loads'} />} />
                      <Route path='/login' element={<LoginForm />} />
                      <Route path='/register' element={<RegisterForm />} />
                      <Route path='account'>
                        <Route index element={<Navigate to=':accountId' />} />
                        <Route path=':accountId' element={<Account />} />
                      </Route>
                      <Route path='loads'>
                        <Route index element={<Home />} />
                        <Route path=':loadId'>
                          <Route index element={<LoadDetailsPage />} />
                        </Route>
                        <Route path='filters'>
                          <Route index element={<Home />} />
                          <Route element={<Home />} path=':filterId' />
                          <Route element={<LoadDetailsPage />} path=':filterId/:loadId' />
                        </Route>
                      </Route>
                      <Route path='fleet'>
                        <Route index element={<Vehicles />} />
                        <Route path='add'>
                          <Route index element={<AddVehicle />} />
                        </Route>
                        <Route path='edit'>
                          <Route element={<EditVehicle />} path=':vehicleId' />
                        </Route>
                      </Route>
                      <Route path='orders'>
                        <Route index element={<Orders />} />
                        <Route path='published'>
                          <Route index element={<PublishedOrders />} />
                          <Route path='accepted' element={<AcceptedOrders />} />
                        </Route>
                        <Route path='received' element={<ReceivedOrders />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </NotificationContextProvider>
              </PaginationContextProvider>
            </UserContextProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
