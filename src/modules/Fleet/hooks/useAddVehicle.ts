import supabase from '../../../config/supabase';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { InsertVehicle } from 'src/utils/api/supabase/types';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';
import { useQueryClient } from '@tanstack/react-query';

export const useAddVehicle = () => {
  const { notify } = useNotificationContext();
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const addVehicle = async (vehicleData: InsertVehicle, userId: string) => {
    const { data, error } = await supabase
      .from('vehicles')
      .insert({ user_id: userId, ...vehicleData });
    if (error) throw new Error(error.message);
    return data;
  };

  return useMutation(
    async ({ vehicleData, userId }: { vehicleData: InsertVehicle; userId: string }) =>
      await addVehicle(vehicleData, userId),
    {
      onSuccess: async () => {
        notify('success', 'vehicle added to fleet');
        navigation('/fleet');
        queryClient.invalidateQueries(['fleet']);
      },
      onError: (error: { message: string }) => {
        console.log(error.message);
        if (error.message.includes('duplicate key')) {
          notify('error', 'Vehicle with this registration number is arleady added');
        } else notify('error', 'Something went wrong while adding vehicle');
      },
    },
  );
};
