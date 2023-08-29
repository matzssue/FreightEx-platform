import supabase from '../../../config/supabase';
import { InsertVehicle } from '../../../utils/api/supabase/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';
export const useUpdateVehicleData = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { notify } = useNotificationContext();
  const updateVehicle = async (updateData: InsertVehicle, vehicleId: string) => {
    if (!vehicleId) return;
    const { data, error } = await supabase
      .from('vehicles')
      .update(updateData)
      .eq('vehicle_register_number', vehicleId)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return useMutation(
    ['fleet'],
    async ({ vehicleData, vehicleId }: { vehicleData: InsertVehicle; vehicleId: string }) =>
      await updateVehicle(vehicleData, vehicleId),
    {
      onSuccess: async () => {
        notify('success', 'vehicle updated');
        navigation('/fleet');
        queryClient.invalidateQueries(['fleet']);
      },
      onError: (error: { message: string }) => {
        console.log(error);
        notify('error', 'Something went wrong while updating vehicle');
      },
    },
  );
};
