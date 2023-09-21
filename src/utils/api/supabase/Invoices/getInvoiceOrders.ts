import supabase from 'src/config/supabase';
import { GetAcceptedLoadsData } from '../types';

export const getInvoiceOrders = async (invoiceId: string | number | undefined) => {
  if (!invoiceId) return;
  const { data: invoiceOrders, error: invoiceError } = await supabase
    .from('accepted_loads')
    .select('*, loading_address_id(*), unloading_address_id(*)')
    .eq('invoice_id', invoiceId)
    .returns<GetAcceptedLoadsData[]>();

  if (invoiceError) throw new Error();

  return invoiceOrders;
};
