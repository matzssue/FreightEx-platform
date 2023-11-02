import { screen, waitFor } from '@testing-library/react';
import { RegisterForm } from './RegisterForm';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'src/setupTests';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { customUser as user } from 'src/setupTests';

const { companyName, vatId, passwordConfirmation, password, email, name, surname } = {
  companyName: 'TestCompany',
  vatId: '123456789',

  passwordConfirmation: 'Password',
  name: 'TestName',
  surname: 'Surname',
  email: 'Test@Company',
  password: 'Password',
};

describe('RegisterForm Component', () => {
  beforeEach(() => {
    render(<RegisterForm />);
  });

  it('allows navigation between steps', async () => {
    await user.type(screen.getByLabelText('Email'), email);
    await user.type(screen.getByLabelText('Name'), name);
    await user.type(screen.getByLabelText('Surname'), surname);
    await user.type(screen.getByLabelText('Password'), password);
    await user.type(screen.getByLabelText('Confirm Password'), passwordConfirmation);

    await user.click(screen.getByText('Next'));

    expect(screen.getByText('Company')).toBeInTheDocument();

    await user.click(screen.getByText('Back'));

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('submits the form', async () => {
    await user.type(screen.getByLabelText('Email'), email);
    await user.type(screen.getByLabelText('Name'), name);
    await user.type(screen.getByLabelText('Surname'), surname);
    await user.type(screen.getByLabelText('Password'), password);
    await user.type(screen.getByLabelText('Confirm Password'), passwordConfirmation);

    await user.click(screen.getByText('Next'));

    await user.type(screen.getByLabelText('VATID'), vatId);
    await user.type(screen.getByLabelText(`Company name`), companyName);

    await user.click(screen.getByText('Submit'));

    expect(screen.getByText(`Loading...`)).toBeInTheDocument();
  });

  it('displays an error message with invalid data for user step', async () => {
    await user.type(screen.getByLabelText('Email'), 'invalid-email');
    await user.type(screen.getByLabelText('Name'), 's');
    await user.type(screen.getByLabelText('Surname'), 's');
    await user.type(screen.getByLabelText('Password'), 'p1');
    await user.type(screen.getByLabelText('Confirm Password'), 'p1');

    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText(/email must be a valid email/i)).toBeInTheDocument();
      expect(screen.getByText('name must be at least 3 characters')).toBeInTheDocument();
      expect(screen.getByText(/surname must be at least 3 characters/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password is too short - should be 8 chars minimum/i),
      ).toBeInTheDocument();
    });
  });
});
