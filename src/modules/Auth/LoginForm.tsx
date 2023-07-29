import styles from './LoginForm.module.scss';
import PasswordInput from '../../common/Inputs/PasswordInput';
import { TextFieldInput } from '../../common/Inputs/TextFieldInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormValues, loginSchema } from '../../utils/schemas/authSchema';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import { useLogin } from '../../hooks/useLogin';
import supabase from '../../config/supabase';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../store/contexts/UserContext';

export const LoginForm = () => {
  const navigator = useNavigate();
  const loginMutation = useLogin();
  const { isLoggedIn } = useUserContext();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoggedIn) navigator('/loads');
  }, [isLoggedIn]);
  console.log(isLoggedIn);
  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver<LoginFormValues>(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await loginMutation.mutateAsync(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setValue('password', '');
      setError('Invalid email or password');
    }
    setIsLoading(false);
  };
  return (
    <AuthFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldInput
          size='medium'
          defaultValue={''}
          label={'Email'}
          control={control}
          name='email'
          row={true}
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
      </form>
    </AuthFormWrapper>
  );
};
