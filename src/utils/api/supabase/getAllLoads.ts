import supabase from '../../../config/supabase';
import { LoadData } from './types';

export const getAllLoads = async () => {
  const { data, error } = await supabase
    .from('loads')
    .select(`*, unloading_address_id(*), loading_address_id(*)`)
    .order('created_at', { ascending: false })
    .returns<LoadData[]>();

  if (error) throw new Error();
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
  // console.log(data);

  return loads;
};
