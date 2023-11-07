import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './store/contexts/UserContext';
import { queryClient } from './config/queryClient';
import { PaginationContextProvider } from './store/contexts/PaginationContext';
import { NotificationContextProvider } from './store/contexts/NotficationContext';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContextProvider>
          <PaginationContextProvider>
            <NotificationContextProvider>{children}</NotificationContextProvider>
          </PaginationContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export const customUser = userEvent.setup();
export * from '@testing-library/react';
export { customRender as render };
