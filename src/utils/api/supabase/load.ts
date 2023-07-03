import supabase from '../../../config/supabase';
import { AddLoadValues } from '../../schemas/addLoadSchema';
import { Database } from '../../../types/supabase';

// export const addLoad = async (newLoad: AddLoadValues) => {
//   const { data, error } = await supabase.from('loads').insert(newLoad);
//   console.log(error);
//   console.log(data);
//   if (error) throw new Error();
//   return data;
// };

type AddressesDatabase = Database['public']['Tables']['addresses']['Row'];
type Loads = Database['public']['Tables']['loads']['Row'];

// type AddLoadData = {
//   length: number;
//   weight: number;
//   loadingAddress: Addresses;
//   unloadingAddress: Addresses;
//   currency: string;
//   loadingDate: string;
//   unloadingDate: string;
//   price: string;
//   term: string;
//   multiCheckbox: string[];
//   created_at: string;
// };
// type Address = {
//   postal_code: string;
//   city: string;
//   latitude: number;
//   longitude: number;
//   country: string;
// };

export type Addresses = Omit<AddressesDatabase, 'id'>;

export type LoadData = Loads & {
  unloading_address_id: AddressesDatabase;
  loading_address_id: AddressesDatabase;
};

export type AddLoadData = Omit<AddLoadValues, 'loadingAddress' | 'unloadingAddress'> & {
  loadingAddress: Addresses;
  unloadingAddress: Addresses;
};
export const addLoad = async (data: AddLoadData) => {
  const loadingId = +data.loadingAddress.postal_code.replace(/-/g, '');
  const unloadingId = +data.unloadingAddress.postal_code.replace(/-/g, '');

  const { error } = await supabase.from('addresses').upsert([
    { id: loadingId, ...data.loadingAddress },
    { id: unloadingId, ...data.unloadingAddress },
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

  const { data: load, error: loadError } = await supabase.from('orders').insert(loadData);
  console.log(loadError, load);
  if (error) throw new Error();
  return data;
};

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
