import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import supabase from '../../../config/supabase';
import { useUserContext } from '../../../store/contexts/UserContext';
export const useLogin = () => {
  const navigation = useNavigate();

  const { setIsLoggedIn, setUserId } = useUserContext();
  async function login({ email, password }: { email: string; password: string }) {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return user;
  }

  return useMutation(
    ['login'],
    async (values: { email: string; password: string }) => await login(values),
    {
      onSuccess: (data) => {
        toast.success('Success you are logged in!');
        setUserId(data.user.id);
        setIsLoggedIn(true);
        navigation('/loads');
      },
      onError: (error) => {
        toast.error('Sorry, something went wrong');
        throw error;
      },
    },
  );
};
