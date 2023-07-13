import supabase from '../../../config/supabase';
import { LoadData } from './types';

export const getLoadDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('loads')
    .select(`*, unloading_address_id(*), loading_address_id(*)`)
    .eq('id', id)
    .returns<LoadData[]>();
  if (error) throw new Error();
  console.log(data);
  const loads = data.map((load) => {
    return {
      id: load.id,
      loadingAddress: load.loading_address_id,
      unloadingAddress: load.unloading_address_id,
      loadingDate: load.loading_date,
      unloadingDate: load.unloading_date,
      vehicleTypes: load.vehicle_types,
      cargoLength: load.length,
      cargoWeight: load.weight,
      paymentTerm: load.term,
      price: load.price,
      currency: load.currency,
    };
  });
  return loads;
};
