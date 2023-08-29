import { useMutation } from '@tanstack/react-query';
import supabase from '../../../config/supabase';
import { useUserContext } from '../../../store/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';
export const useLogout = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { clear } = useNotificationContext();
  const { setIsLoggedIn, setUserId } = useUserContext();
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  return useMutation(async () => await logout(), {
    onSuccess: () => {
      setUserId(undefined);
      setIsLoggedIn(false);
      queryClient.clear();
      navigation('/login');
      clear();
    },
    onError: (error) => {
      throw error;
    },
  });
};
