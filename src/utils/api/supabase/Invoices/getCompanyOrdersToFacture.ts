import supabase from '../../../../config/supabase';
import { GetAcceptedLoadsData } from '../types';

export const getCompanyOrdersToFacture = async (
  userId: string | undefined,
  companyVatId: string | undefined,
) => {
  const { data: ordersData, error } = await supabase
    .from('accepted_loads')
    .select(
      `*, user_id!inner(company_vat_id, id), accepted_by(*), loading_address_id(*), unloading_address_id(*)`,
    )
    .eq('accepted_by', userId)
    .is('invoice_id', null)
    .neq('vehicle_id', null)
    .filter('user_id.company_vat_id', 'eq', companyVatId)
    .returns<GetAcceptedLoadsData[]>();
  if (error) throw new Error();
  console.log(ordersData);
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
