import supabase from '../../../config/supabase';
import { AddLoadData } from './types';
export const addLoad = async (data: AddLoadData) => {
  const loadingId = +data.loadingAddressData.postal_code.replace(/-/g, '');
  const unloadingId = +data.unloadingAddressData.postal_code.replace(/-/g, '');

  const { error } = await supabase.from('addresses').upsert([
    { id: loadingId, ...data.loadingAddressData },
    { id: unloadingId, ...data.unloadingAddressData },
  ]);
  if (error) throw new Error();

  const loadData = {
    loading_address_id: loadingId,
    unloading_address_id: unloadingId,
    currency: data.currency,
    weight: data.weight,
    loading_date: data.loadingDate,
    unloading_date: data.unloadingDate,
    price: data.price,
    term: data.term,
    length: data.length,
    vehicle_types: data.multiCheckbox,
  };

  const { data: load, error: loadError } = await supabase.from('loads').insert(loadData);

  if (loadError) throw new Error();
  return load;
};
