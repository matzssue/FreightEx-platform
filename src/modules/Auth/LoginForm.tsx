import styles from './LoginForm.module.scss';
import PasswordInput from '../../common/Inputs/PasswordInput';
import { TextFieldInput } from '../../common/Inputs/TextFieldInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormValues, loginSchema } from '../../utils/schemas/authSchema';
import { Link } from 'react-router-dom';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import { useLogin } from '../../hooks/useLogin';
import supabase from '../../config/supabase';
import { useEffect } from 'react';
export const LoginForm = () => {
  const loginMutation = useLogin();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver<LoginFormValues>(loginSchema),
  });
  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
    loginMutation.mutateAsync(data);
    console.log(data);
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
            Submit
          </button>
          <p className={styles.register}>
            New to our platform? <Link to={'/register'}>Sign Up</Link>
          </p>
        </div>
      </form>
    </AuthFormWrapper>
  );
};
