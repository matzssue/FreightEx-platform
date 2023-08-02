import supabase from '../../../../config/supabase';
import { GetLoadsData } from '../types';
import { Load } from '../types';
export const getLoadDetails = async (id: string) => {
  const { data: loadData, error } = await supabase
    .from('loads')
    .select(`*, unloading_address_id(*), loading_address_id(*)`)
    .eq('id', id)
    .returns<GetLoadsData[]>()
    .single();
  if (error) throw new Error();

  const loads = {
    id: loadData.id,
    loadingAddress: loadData.loading_address_id,
    unloadingAddress: loadData.unloading_address_id,
    loadingDate: loadData.loading_date,
    unloadingDate: loadData.unloading_date,
    vehicleTypes: loadData.vehicle_types,
    cargoLength: loadData.length,
    cargoWeight: loadData.weight,
    term: loadData.term,
    price: loadData.price,
    currency: loadData.currency,
  } as Partial<Load>;
  return loads;
};
