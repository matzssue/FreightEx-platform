import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { LoginForm } from './modules/Auth/components/LoginBox/LoginForm';
import { RegisterForm } from './modules/Auth/components/RegisterBox/RegisterForm';
import JoyrideWrapper from './modules/Joyride/components/JoyrideWrapper/JoyrideWrapper';
import { Error404 } from './Pages/404/Error404';
import { Account } from './Pages/Account/Account';
import { AddVehicle } from './Pages/Fleet/AddVehicle';
import { EditVehicle } from './Pages/Fleet/EditVehicle';
import { Vehicles } from './Pages/Fleet/Vehicles';
import { Invoices } from './Pages/Invoices/Invoices';
import { Home } from './Pages/Loads/Home';
import { LoadDetailsPage } from './Pages/Loads/LoadDetailsPage';
import { AcceptedOrders } from './Pages/Orders/AcceptedOrders';
import { Orders } from './Pages/Orders/Orders';
import { PublishedOrders } from './Pages/Orders/PublishedOrders';
import { ReceivedOrders } from './Pages/Orders/ReceivedOrders';
import { JoyRideContextProvider } from './store/contexts/JoyRideContext';
<<<<<<< HEAD
import JoyrideWrapper from './modules/Joyride/components/JoyrideWrapper/JoyrideWrapper';
import { Error404 } from './Pages/404/Error404';
import { queryClient } from './config/queryClient';
=======
import { NotificationContextProvider } from './store/contexts/NotficationContext';
import { PaginationContextProvider } from './store/contexts/PaginationContext';
import { UserContextProvider } from './store/contexts/UserContext';
import ErrorBoundary from './utils/helpers/ErrorBoundary';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});
>>>>>>> 1a29e4ef0d2e59111bf9137c0e9f5ced099e45d0

const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools position='top-right' initialIsOpen={false} />
      )}
      <ErrorBoundary>
        <BrowserRouter>
          <JoyRideContextProvider>
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
                  <JoyrideWrapper />
                  <Suspense fallback='Loading...'>
                    <Routes>
                      <Route path='*' element={<Error404 />} />
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
                      <Route path='invoices'>
                        <Route index element={<Invoices />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </NotificationContextProvider>
              </PaginationContextProvider>
            </UserContextProvider>
          </JoyRideContextProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </>
);

export default App;
