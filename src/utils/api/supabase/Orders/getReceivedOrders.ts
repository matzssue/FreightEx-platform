import supabase from 'src/config/supabase';
import { AcceptedLoad, GetAcceptedLoadsData } from '../types';
export const getReceivedOrders = async (userId: string | undefined) => {
  console.log(userId);
  const { data: ordersData, error } = await supabase
    .from('accepted_loads')
    .select(`*, unloading_address_id(*), loading_address_id(*), user_id(*, company_vat_id(*))`)
    .eq('accepted_by', userId)
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
        avatar: load.user_id.avatar,
        email: load.user_id.email,
        id: load.user_id.id,
        name: load.user_id.name,
        surname: load.user_id.surname,
      },
      company: load.user_id.company_vat_id,
      createdAt: load.created_at,
    };
  }) as AcceptedLoad[];

  console.log('ordersData,', ordersData);

  return orders;
};
