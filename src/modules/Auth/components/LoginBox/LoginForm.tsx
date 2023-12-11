import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthFormWrapper } from '../../../../common/AuthFormWrapper/AuthFormWrapper';
import PasswordInput from '../../../../common/Inputs/PasswordInput/PasswordInput';
import { TextFieldInput } from '../../../../common/Inputs/TextField/TextFieldInput';
import { useUserContext } from '../../../../store/contexts/UserContext';
import { LoginFormValues, loginSchema } from '../../../../utils/schemas/authSchema';
import { useLogin } from '../../hooks/useLogin';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const navigator = useNavigate();
  const loginMutation = useLogin();
  const { isLoggedIn, logIn } = useUserContext();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigator('/loads');
  }, [isLoggedIn]);

  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver<LoginFormValues>(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await loginMutation.mutateAsync(data);
    } catch (error) {
      setValue('password', '');
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthFormWrapper>
      <form data-testid='login-form' onSubmit={handleSubmit(onSubmit)}>
        <TextFieldInput
          size='medium'
          defaultValue={''}
          label={'Email'}
          control={control}
          name='email'
          column={true}
        />
        <PasswordInput label={'Password'} size='medium' control={control} name='password' />
        <div className={styles.buttons}>
          <button type='submit' className={styles.submit}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          {error ? <p className={styles.error}>{error}</p> : ''}
          <p className={styles.register}>
            New to our platform? <Link to={'/register'}>Sign Up</Link>
          </p>
        </div>
        <div className={styles['test-account']}>
          <h4>Test Acccount</h4>
          <p>Login: test1@transportex.com</p>
          <p>Password: Test123</p>
        </div>
      </form>
    </AuthFormWrapper>
  );
};
