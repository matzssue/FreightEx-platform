import supabase from '../../../config/supabase';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';
export const useDeleteVehicle = () => {
  const { notify } = useNotificationContext();
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const deleteVehicle = async (vehicleId: string) => {
    if (!vehicleId) return;

    const { data, error } = await supabase
      .from('vehicles')
      .delete()
      .eq('vehicle_register_number', vehicleId);
    if (error) throw error;
    return data;
  };

  return useMutation(async (vehicleId: string) => await deleteVehicle(vehicleId), {
    onSuccess: async () => {
      notify('success', 'vehicle deleted');
      navigation('/fleet');
      queryClient.invalidateQueries(['fleet']);
    },
    onError: (error: { message: string }) => {
      console.log(error);
      toast.error('Something went wrong while deleting vehicle');
    },
  });
};
