import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';

import supabase from '../../../config/supabase';
export const useUpdateAcceptedLoad = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { notify } = useNotificationContext();

  const updateAcceptedLoad = async (registerNumber: string, orderId: string) => {
    if (!orderId) return;
    const { data, error } = await supabase
      .from('accepted_loads')
      .update({ vehicle_id: registerNumber })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return useMutation(
    async ({ registerNumber, orderId }: { orderId: string; registerNumber: string }) =>
      await updateAcceptedLoad(registerNumber, orderId),
    {
      onSuccess: async () => {
        notify('success', 'vehicle successfully selected');
        navigation('/orders/received');
        queryClient.invalidateQueries(['receivedOrders']);
      },
      onError: (error: { message: string }) => {
        console.log(error);
        notify('error', 'Something went wrong while selecting vehicle');
      },
    },
  );
};
