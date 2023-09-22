import supabase from 'src/config/supabase';
import { GetAcceptedLoadsData } from '../types';

export const getOrdersToFacture = async (userId: string | undefined) => {
  if (!userId) return;
  const { data: ordersData, error } = await supabase
    .from('accepted_loads')
    .select(
      `*, unloading_address_id(*), loading_address_id(*), accepted_by(*), user_id(*, company_vat_id(*))`,
    )
    .eq('accepted_by', userId)
    .is('invoice_id', null)
    .neq('vehicle_id', null)
    .returns<GetAcceptedLoadsData[]>();

  if (error) throw new Error();
  const orders = ordersData.map((load) => {
    return {
      id: load.id,
      loadingCountry: load.loading_address_id.country,
      loadingCity: load.loading_address_id.city,
      unloadingCountry: load.loading_address_id.country,
      unloadingCity: load.unloading_address_id.city,
      paymentTerm: load.term,
      price: load.price,
      currency: load.currency,
      seller: load.accepted_by.id,
      recipient: load.user_id.id,
      createdAt: load.created_at,
      vehicleId: load.vehicle_id,
    };
  });

  return orders;
};
