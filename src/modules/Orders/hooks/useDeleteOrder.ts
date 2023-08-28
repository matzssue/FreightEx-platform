import supabase from '../../../config/supabase';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';

export const useDeleteOrder = () => {
  const { notify } = useNotificationContext();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const deleteOrder = async (loadId: string) => {
    if (!loadId) return;

    const { data, error } = await supabase.from('loads').delete().eq('id', loadId);
    if (error) throw error;
    return data;
  };
  return useMutation(['loads', 'published'], async (loadId: string) => await deleteOrder(loadId), {
    onSuccess: async () => {
      notify('success', 'order deleted');
      navigation('/orders/published');
      queryClient.invalidateQueries(['loads', 'published']);
    },
    onError: (error: { message: string }) => {
      console.log(error);
      toast.error('Something went wrong while deleting order');
    },
  });
};