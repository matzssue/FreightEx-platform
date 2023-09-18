import { useNotificationContext } from 'src/store/contexts/NotficationContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from 'src/config/supabase';
import { InsertInvoice } from 'src/utils/api/supabase/types';
export const useAddInvoince = () => {
  const { notify } = useNotificationContext();
  const queryClient = useQueryClient();
  const addInvoice = async (invoiceData: InsertInvoice, loadsId: string[]) => {
    console.log(loadsId);
    const { data: invoice, error: loadError } = await supabase
      .from('invoices')
      .insert(invoiceData)
      .select()
      .single();

    if (loadError) throw loadError;

    if (!invoice) return;

    const updateLoads = async () => {
      const promises = loadsId.map(async (id) => {
        const { error: updateError } = await supabase
          .from('accepted_loads')
          .update({ invoice_id: invoice.id })
          .eq('id', id)
          .select();
        return { id, updateError };
      });

      const results = await Promise.all(promises);

      return results;
    };

    updateLoads();
  };
  return useMutation(
    ['invoices'],
    async ({ invoiceData, loadsId }: { invoiceData: InsertInvoice; loadsId: string[] }) =>
      await addInvoice(invoiceData, loadsId),
    {
      onSuccess: async () => {
        notify('success', 'Invoice added');
        queryClient.invalidateQueries(['companyFactures']);
        queryClient.invalidateQueries(['ordersToFacture']);
        queryClient.invalidateQueries(['receivedOrders']);
      },
      onError: (error: { message: string }) => {
        console.log(error);
        notify('error', 'Something went wrong while accepting offer');
      },
    },
  );
};
