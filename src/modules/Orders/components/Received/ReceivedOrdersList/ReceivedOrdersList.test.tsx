import { screen, waitFor } from '@testing-library/react';

import { vi } from 'vitest';

import { render } from 'src/setupTests';

import { ReceivedOrdersList } from './ReceivedOrdersList';

type MockData = { data: {}; isLoading: boolean; isError: boolean };

let mockData: MockData;

vi.mock('@tanstack/react-query', async () => {
  const actual = (await vi.importActual('@tanstack/react-query')) as {};
  return {
    ...actual,
    _esModule: true,
    useQuery: vi.fn(() => mockData),
  };
});

describe('ReceivedOrdersList', () => {
  it('renders loading spinner when use', async () => {
    mockData = { data: {}, isLoading: true, isError: true };
    render(<ReceivedOrdersList />);
    await waitFor(() => {
      const loadingSpinner = screen.getByRole('progressbar');
      expect(loadingSpinner).toBeInTheDocument();
    });
  });
  it('renders error message when there is an error', async () => {
    mockData = { data: {}, isLoading: false, isError: true };

    render(<ReceivedOrdersList />);
    await waitFor(() => {
      const errorMessage = screen.getByText(/Error loading data/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('renders component with list of received orders', async () => {
    mockData = {
      data: {
        orders: [
          {
            id: '1',
            loadingAddress: {
              country: 'asd',
            },
            unloadingAddress: {
              country: 'asd2',
            },
            loadingDate: '2023-11-02',
            unloadingDate: '2023-11-05',
            vehicleTypes: ['solo'],
            cargoLength: 5.5,
            cargoWeight: 1000,
            paymentTerm: 'Cash on Delivery',
            price: 500,
            currency: 'USD',
            user: {},
            company: {},
            createdAt: '2023-11-01',
            vehicleId: 'Vehicle 1',
          },
        ],
      },
      isLoading: false,
      isError: false,
    };
    render(<ReceivedOrdersList />);
    await waitFor(() => {
      const currency = screen.getByText(/USD/i);
      const price = screen.getByText(/500/i);
      const cargoLength = screen.getByText(/5.5/i);

      expect(currency).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(cargoLength).toBeInTheDocument();
    });
  });
});
