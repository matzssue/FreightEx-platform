import supabase from 'src/config/supabase';
import { GetInvoices, GetInvoicesDatabase } from '../types';

export const getUserInvoices = async (
  id: string | undefined,
  page: number,
  itemsPerPage: number,
) => {
  if (!id) return;
  const {
    data: invoices,
    error: invoiceError,
    count,
  } = await supabase
    .from('invoices')
    .select('*, recipient_id(*, company_vat_id(*)), seller_id(*, company_vat_id(*))', {
      count: 'exact',
    })
    .eq('seller_id', id)
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
    .returns<GetInvoicesDatabase[]>();

  if (invoiceError) throw new Error();

  const invoiceData: GetInvoices[] = invoices.map((invoice) => {
    return {
      id: invoice.id,
      cost: invoice.cost,
      date: invoice.date,
      endDate: invoice.end_date,
      paymentTerm: invoice.payment_term,
      recipient: invoice.recipient_id,
      seller: invoice.seller_id,
      additionalInformations: invoice.additional_informations,
      currency: invoice.currency,
    };
  });

  const totalPages = count && Math.ceil(count / 4);
  const returnValue =
    totalPages && invoices ? { invoiceData, totalPages } : { invoiceData: [], totalPages: 0 };

  return returnValue;
};
