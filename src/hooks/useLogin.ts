import { useMutation } from '@tanstack/react-query';
import supabase from '../config/supabase';
import { useUserContext } from '../store/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigation = useNavigate();

  const { setIsLoggedIn, setUserId } = useUserContext();
  async function login({ email, password }: { email: string; password: string }) {
    // console.log(email, password);

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
        setUserId(data.user.id);
        setIsLoggedIn(true);

        navigation('/loads');
      },
      onError: (error) => {
        throw error;
      },
    },
  );
};
