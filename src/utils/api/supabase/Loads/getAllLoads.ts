import supabase from '../../../../config/supabase';
import { GetLoadsData, Load } from '../types';

export const getAllLoads = async (page: number, loadsPerPage: number) => {
  const { data, count, error } = await supabase
    .from('loads')
    .select(`*, unloading_address_id(*), loading_address_id(*), user_id(*, company_vat_id(*))`, {
      count: 'exact',
    })
    .order('created_at', { ascending: false })
    .range((page - 1) * loadsPerPage, page * loadsPerPage - 1)
    .returns<GetLoadsData[]>();

  if (error) throw new Error();
  const loads = data.map((load) => ({
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
  })) as Load[];
  const totalPages = count && Math.ceil(count / loadsPerPage);
  if (!totalPages) return { loads: [], totalPages: 0 };
  return { loads, totalPages };
};
