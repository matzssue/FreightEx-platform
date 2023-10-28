import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render, waitFor } from '@testing-library/react';
import { UserContextProvider } from 'src/store/contexts/UserContext';
import { LoginForm } from './LoginForm';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();
const mockUsedNavigate = vi.fn();
const user = userEvent.setup();

vi.mock('react-router-dom', () => ({
  ...require('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

vi.mock('../../hooks/useLogin', () => ({
  useLogin: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock('../../store/contexts/UserContext', () => ({
  useUserContext: vi.fn(() => ({
    isLoggedIn: false,
  })),
}));

describe('Login Form component', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </UserContextProvider>
      </QueryClientProvider>,
    );
  });

  it('username, password input, button should be rendered', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    const buttonEl = screen.getByRole('button', { name: 'Login' });

    expect(buttonEl).toBeInTheDocument();
  });

  it('email, password input should change', async () => {
    const testValue = 'test';
    const emailInputEl = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInputEl = screen.getByLabelText('Password') as HTMLInputElement;
    await user.type(emailInputEl, testValue);
    await user.type(passwordInputEl, testValue);

    expect(emailInputEl.value).toBe(testValue);
    expect(passwordInputEl.value).toBe(testValue);
  });

  it('displays an error message for invalid data', async () => {
    const emailInputEl = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInputEl = screen.getByLabelText('Password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInputEl, 'invalid@email.pl');
    await user.type(passwordInputEl, 'password123');
    user.click(submitButton);

    waitFor(() => {
      const errorMessage = screen.queryByText('Invalid email or password');
      expect(errorMessage).toBeInTheDocument();

      expect(emailInputEl.value).toBe('invalid@email.pl');
      expect(passwordInputEl.value).toBe('');
    });
  });
});
