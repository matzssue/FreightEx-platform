import { useParams } from 'react-router-dom';
import { AddOrEditVehicleForm } from '../AddVehicle/AddOrEditVehicleForm/AddOrEditVehicleForm';
import { useQuery } from '@tanstack/react-query';
import { getVehicleData } from 'src/utils/api/supabase/Vehicles/getVehicleData';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
export const EditVehicleWrapper = () => {
  const { vehicleId } = useParams();

  const { data, isLoading } = useQuery([vehicleId], async () => await getVehicleData(vehicleId), {
    enabled: !!vehicleId,
  });
  if (!vehicleId) return;
  return <>{!isLoading ? <AddOrEditVehicleForm {...data} mode='edit' /> : <LoadingSpinner />}</>;
};
