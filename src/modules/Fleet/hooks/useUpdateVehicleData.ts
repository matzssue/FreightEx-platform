import supabase from '../../../config/supabase';
import { InsertVehicle } from '../../../utils/api/supabase/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
export const useUpdateVehicleData = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

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
        toast.success('vehicle updated');
        navigation('/fleet');
        queryClient.invalidateQueries(['fleet']);
      },
      onError: (error: { message: string }) => {
        console.log(error);
        toast.error('Something went wrong while updating vehicle');
      },
    },
  );
};
