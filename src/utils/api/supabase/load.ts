import supabase from '../../../config/supabase';
import { AddLoadValues } from '../../schemas/addLoadSchema';
import { Database } from '../../../types/supabase';

import { LoadsFiltersValues } from '../../schemas/loadsFilters';
import { LoadsFilters } from '../../../store/reducers/loadsFiltersSlice';

type AddressesDatabase = Database['public']['Tables']['addresses']['Row'];
type Loads = Database['public']['Tables']['loads']['Row'];

export type Addresses = Omit<AddressesDatabase, 'id'>;

export type LoadData = Loads & {
  unloading_address_id: AddressesDatabase;
  loading_address_id: AddressesDatabase;
};

export type AddLoadData = AddLoadValues & {
  loadingAddressData: Addresses;
  unloadingAddressData: Addresses;
};

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
export const getFilteredLoads = async (filter: LoadsFilters) => {
  if (!filter) return;
  const {
    maxWeight,
    minLength,
    minWeight,
    maxLength,
    startLoadingDate,
    endLoadingDate,
    startUnloadingDate,
    endUnloadingDate,
    loadingArea,
    loadingAddressData,
  } = filter;

  // if (!loadingArea) {
  //   query = supabase.from('loads').select(`*, unloading_address_id(*), loading_address_id(*)`);
  //   console.log('noLoadingArea', query);
  // }

  const dinstanceInKm = loadingArea * 1000;
  let query = supabase.rpc('get_entries_within_distance', {
    distance: dinstanceInKm,
    tlatitude: loadingAddressData.latitude,
    tlongitude: loadingAddressData.longitude,
  });

  console.log(startLoadingDate, endLoadingDate, startLoadingDate, endUnloadingDate);
  if (!query) return;

  if (maxWeight) {
    query = query.lte('weight', maxWeight);
  }
  if (minWeight) {
    query = query.gte('weight', minWeight);
  }
  if (maxLength) {
    query = query.lte('length', maxLength);
  }
  if (minLength) {
    query = query.gte('length', minLength);
  }
  if (startLoadingDate) {
    query = query.gte('loading_date', startLoadingDate);
  }
  if (endLoadingDate) {
    query = query.lte('loading_date', endLoadingDate);
  }
  if (startUnloadingDate) {
    query = query.gte('unloading_date', startUnloadingDate);
  }
  if (endUnloadingDate) {
    query = query.lte('unloading_date', endUnloadingDate);
  }

  const { data, error } = await query.returns<LoadData[]>();

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
