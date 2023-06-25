import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './styles/global.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/themes.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
