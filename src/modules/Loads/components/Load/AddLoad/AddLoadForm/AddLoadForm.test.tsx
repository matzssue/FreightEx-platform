import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NotificationContextProvider } from 'src/store/contexts/NotficationContext';
import { UserContextProvider } from 'src/store/contexts/UserContext';
import { vi } from 'vitest';

import { AddLoadForm } from './AddLoadForm';

const mockFunction = vi.fn();

vi.mock('react-router-dom', () => ({
  ...require('react-router-dom'),
  useNavigate: () => mockFunction,
}));
vi.mock('../../../../../../store/hooks', () => ({
  useAppDispatch: () => mockFunction,
  useAppSelector: () => mockFunction,
}));

const queryClient = new QueryClient();

describe('Add Load Form component', () => {
  it('submits form', () => {
    const mockMutate = vi.fn();
    const mockCloseModal = vi.fn();

    const mockUser = 123;

    render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <NotificationContextProvider>
            <BrowserRouter>
              <AddLoadForm />
            </BrowserRouter>
          </NotificationContextProvider>
        </UserContextProvider>
      </QueryClientProvider>,
    );

    const addButton = screen.getByText('Submit');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(expect.objectContaining({ mockUser }));
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });
});
