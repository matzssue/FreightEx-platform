<<<<<<< HEAD
import { screen, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { vi } from 'vitest';
=======
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserContextProvider } from 'src/store/contexts/UserContext';
import { vi } from 'vitest';

import { LoginForm } from './LoginForm';
>>>>>>> 1a29e4ef0d2e59111bf9137c0e9f5ced099e45d0

import { render } from 'src/setupTests';

import { customUser as user } from 'src/setupTests';
vi.mock('../../hooks/useLogin', () => ({
  useLogin: () => ({
    mutateAsync: vi.fn(),
  }),
}));

const emailInput = 'invalid@email.pl';
const passwordInput = 'password123';
const incorrectEmail = 'emailtest';

describe('Login Form component', () => {
  it('username, password input, button should be rendered', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    const buttonEl = screen.getByRole('button', { name: 'Login' });

    expect(buttonEl).toBeInTheDocument();
  });

  it('validate email, password', async () => {
    render(<LoginForm />);
    const emailInputEl = screen.getByLabelText('Email') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInputEl, incorrectEmail);
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/email must be a valid email/i));
      expect(screen.getByText(/No password provided./i));
    });
  });

  it('submit form', async () => {
    render(<LoginForm />);
    const onSubmitMock = vi.fn();
    const loginForm = screen.getByTestId('login-form');
    loginForm.onsubmit = onSubmitMock();

    const emailInputEl = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInputEl = screen.getByLabelText('Password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await user.type(passwordInputEl, passwordInput);
    await user.type(emailInputEl, emailInput);
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
  });
});
