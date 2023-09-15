import { useNotificationContext } from 'src/store/contexts/NotficationContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import supabase from 'src/config/supabase';

export const useAddInvoince = () => {
  const { notify } = useNotificationContext();
  const queryClient = useQueryClient();

  const addInvoice = async (invoiceData) => {
    console.log(invoiceData);
    const { load_id, ...invoiceDataWithoutId } = invoiceData;
    const { data: invoice, error: loadError } = await supabase
      .from('invoices')
      .insert(invoiceDataWithoutId)
      .select()
      .single();
    if (loadError) throw loadError;
    console.log(invoice);
    if (!invoice) return;
    const { error: updateError } = await supabase
      .from('accepted_loads')
      .update({ invoice_id: invoice.id })
      .eq('id', load_id)
      .select();
    console.log(updateError);
  };
  return useMutation(async (invoiceData) => await addInvoice(invoiceData), {
    onSuccess: async () => {
      notify('success', 'Invoice added');
      //   queryClient.invalidateQueries(['loads']);
      //   queryClient.invalidateQueries(['filteredLoads']);
    },
    onError: (error: { message: string }) => {
      console.log(error);
      notify('error', 'Something went wrong while accepting offer');
    },
  });
};
