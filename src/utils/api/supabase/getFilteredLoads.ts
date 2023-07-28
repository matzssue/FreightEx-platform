import supabase from '../../../config/supabase';
import { LoadsFilters } from '../../../store/reducers/loadsFiltersSlice';
import { GetLoadsData, Load } from './types';
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

  const { data, error } = await query.returns<GetLoadsData[]>();

  if (error) throw new Error();

  const loads = data.map((load) => {
    console.log('load', load);
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
      user: {
        avatar: load.user_id.avatar,
        email: load.user_id.email,
        id: load.user_id.id,
        name: load.user_id.name,
        surname: load.user_id.surname,
      },
      company: load.user_id.company_vat_id,
      createdAt: load.created_at,
    };
  }) as Load[];

  return loads;
};
