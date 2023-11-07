import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';

import supabase from '../../../config/supabase';

export const useDeleteOrder = () => {
  const { notify } = useNotificationContext();
  const queryClient = useQueryClient();

  const deleteOrder = async (loadId: string) => {
    if (!loadId) return;

    const { data, error } = await supabase.from('loads').delete().eq('id', loadId);
    if (error) throw error;
    return data;
  };
  return useMutation(async (loadId: string) => await deleteOrder(loadId), {
    onSuccess: async () => {
      notify('success', 'order deleted');
      queryClient.invalidateQueries(['loads']);
      queryClient.invalidateQueries(['published']);
      queryClient.invalidateQueries(['filteredLoads']);
    },
    onError: (error: { message: string }) => {
      console.log(error);
      toast.error('Something went wrong while deleting order');
    },
  });
};
