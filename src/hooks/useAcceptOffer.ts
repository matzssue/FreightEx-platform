import { useMutation } from '@tanstack/react-query';
import supabase from '../config/supabase';
import { AcceptedLoad } from '../utils/api/supabase/types';

const addAcceptedLoad = async (loadId: string, userId: string) => {
  if (!loadId || !userId) return;

  const { data: loadData, error } = await supabase
    .from('loads')
    .select(`*`)
    .eq('id', loadId)
    .returns<AcceptedLoad[]>()
    .single();

  if (error) throw new Error();

  const loadWithUser = { ...loadData, accepted_by: userId };

  const { data, error: loadError } = await supabase.from('accepted_loads').insert(loadWithUser);
  if (loadError) throw loadError;

  return data;
};

export const useAcceptOffer = () => {
  return useMutation(
    ['loads'],
    async ({ loadId, userId }: { loadId: string; userId: string }) =>
      await addAcceptedLoad(loadId, userId),
    {
      onSuccess: async (data, id) => {
        console.log('succes id', id);
      },
      onError: (error: { message: string }) => {
        console.log(error);
      },
    },
  );
};
