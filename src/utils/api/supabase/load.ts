import supabase from '../../../config/supabase';
import { AddLoadValues } from '../../schemas/addLoadSchema';

// export const addLoad = async (newLoad: AddLoadValues) => {
//   const { data, error } = await supabase.from('loads').insert(newLoad);
//   console.log(error);
//   console.log(data);
//   if (error) throw new Error();
//   return data;
// };

export const addLoad = async (data) => {
  const loadingId = data.loadingAddress.postal_code.replace(/-/g, '');
  const unloadingId = data.unloadingAddress.postal_code.replace(/-/g, '');

  const { error } = await supabase.from('addresses').upsert([
    { id: loadingId, ...data.loadingAddress },
    { id: unloadingId, ...data.unloadingAddress },
  ]);
  if (error) throw new Error();

  console.log(data);
  // console.log(error);
  console.log(data);
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

  const { data: load, error: loadError } = await supabase.from('orders').insert(loadData);
  console.log(loadError, load);
  if (error) throw new Error();
  return data;
};
export const getAllLoads = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, unloading_address_id(*), loading_address_id(*)');
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
