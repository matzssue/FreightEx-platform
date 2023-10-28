import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { getVehicleData } from 'src/utils/api/supabase/Vehicles/getVehicleData';

import { AddOrEditVehicleForm } from '../AddVehicle/AddOrEditVehicleForm/AddOrEditVehicleForm';
export const EditVehicleWrapper = () => {
  const { vehicleId } = useParams();

  const { data, isLoading } = useQuery([vehicleId], async () => await getVehicleData(vehicleId), {
    enabled: !!vehicleId,
  });
  if (!vehicleId) return;
  return <>{!isLoading ? <AddOrEditVehicleForm {...data} mode='edit' /> : <LoadingSpinner />}</>;
};
