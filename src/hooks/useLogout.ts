import { useMutation } from '@tanstack/react-query';
import supabase from '../config/supabase';
import { useUserContext } from '../store/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigation = useNavigate();

  const { setIsLoggedIn, setUser } = useUserContext();
  async function logout() {
    // console.log(email, password);

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  return useMutation(async () => await logout(), {
    onSuccess: () => {
      setUser(undefined);
      setIsLoggedIn(false);
      navigation('/');
    },
    onError: (error) => {
      throw error;
    },
  });
};
