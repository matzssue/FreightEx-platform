import supabase from '../../../config/supabase';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { InsertVehicle } from 'src/utils/api/supabase/types';

export const useAddCar = () => {
  const navigation = useNavigate();

  const addVehicle = async (vehicleData: InsertVehicle, userId: string) => {
    console.log(vehicleData);
    const { data, error } = await supabase
      .from('vehicles')
      .upsert({ user_id: userId, ...vehicleData });
    if (error) throw new Error();
    return data;
  };

  return useMutation(
    ['vehicles'],
    async ({ vehicleData, userId }: { vehicleData: InsertVehicle; userId: string }) =>
      await addVehicle(vehicleData, userId),
    {
      onSuccess: async (data, id) => {
        console.log('succes id', data, id);
        toast.success('vehicle added to fleet');
        navigation('/vehicles');
      },
      onError: (error: { message: string }) => {
        console.log(error);
        toast.error('Something went wrong while adding vehicle');
      },
    },
  );
};
