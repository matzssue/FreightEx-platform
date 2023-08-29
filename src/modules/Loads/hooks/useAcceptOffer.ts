import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../../config/supabase';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';
export const useAcceptOffer = () => {
  const { notify } = useNotificationContext();
  const queryClient = useQueryClient();

  const addAcceptedLoad = async (loadId: string, userId: string) => {
    if (!loadId || !userId) return;

    const { data: loadData, error } = await supabase
      .from('loads')
      .select(`*`)
      .eq('id', loadId)
      .single();

    if (error) throw new Error();
    if (!loadData) return;
    const { id, ...loadDataWithoutId } = loadData;
    const loadWithUser = { ...loadDataWithoutId, accepted_by: userId };
    if (!loadWithUser) return;
    const { data, error: loadError } = await supabase.from('accepted_loads').insert(loadWithUser);
    if (loadError) throw loadError;

    return data;
  };

  const deleteFromLoads = async (loadId: string) => {
    if (!loadId) return;

    const { error } = await supabase.from('loads').delete().eq('id', loadId);
    if (error) throw error;
  };

  return useMutation(
    ['loads'],
    async ({ loadId, userId }: { loadId: string; userId: string }) =>
      await addAcceptedLoad(loadId, userId),
    {
      onSuccess: async (_, id) => {
        notify('success', 'Offer accepted');
        await deleteFromLoads(id.loadId);
        queryClient.invalidateQueries(['received', 'loads']);
      },
      onError: (error: { message: string }) => {
        console.log(error);
        notify('error', 'Something went wrong while accepting offer');
      },
    },
  );
};
