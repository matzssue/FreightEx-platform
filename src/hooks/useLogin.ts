import { useMutation } from '@tanstack/react-query';
import supabase from '../config/supabase';

import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigation = useNavigate();

  async function login({ email, password }: { email: string; password: string }) {
    console.log(email, password);
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      throw new Error();
    }
    return user;
  }

  return useMutation(
    ['login'],
    async (values: { email: string; password: string }) => await login(values),
    {
      onSuccess: (data) => {
        console.log(data);
        navigation('/loads');
      },
      onError: (error) => {
        console.log(error);
        console.log('Cos poszlo nie tak');
      },
    },
  );
};
