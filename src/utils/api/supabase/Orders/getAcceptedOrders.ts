import supabase from 'src/config/supabase';
import { AcceptedLoad, GetAcceptedLoadsData } from '../types';
export const getAcceptedOrders = async (
  userId: string | undefined,
  page: number,
  loadsPerPage: number,
) => {
  const {
    data: ordersData,
    error,
    count,
  } = await supabase
    .from('accepted_loads')
    .select(
      `*, unloading_address_id(*), loading_address_id(*), user_id(*), accepted_by(*, company_vat_id(*))`,
      {
        count: 'exact',
      },
    )
    .eq('user_id', userId)
    .range((page - 1) * loadsPerPage, page * loadsPerPage - 1)
    .returns<GetAcceptedLoadsData[]>();

  if (error) throw new Error();

  const orders = ordersData.map((load) => {
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
        avatar: load.accepted_by.avatar,
        email: load.accepted_by.email,
        id: load.accepted_by.id,
        name: load.accepted_by.name,
        surname: load.accepted_by.surname,
      },
      company: load.accepted_by.company_vat_id,
      createdAt: load.created_at,
    };
  }) as AcceptedLoad[];
  const totalPages = count && Math.ceil(count / loadsPerPage);
  if (!totalPages) return;
  return { orders, totalPages };
};
