import { useMutation } from '@tanstack/react-query';
import supabase from '../config/supabase';
import { LoadData } from '../utils/api/supabase/types';

const addAcceptedLoad = async (id, user) => {
  if (!id || !user) return;
  console.log(user);
  const { data: loadData, error } = await supabase
    .from('loads')
    .select(`*`)
    .eq('id', id)
    .returns<LoadData[]>()
    .single();
  if (error) throw new Error();
  console.log('id:', id, 'user:', user);
  const loadWithUser = { ...loadData, accepted_by: user };
  console.log(loadWithUser);
  console.log(id, user);
  //   const loadWithUser = await getLoadDetails(id, user);
  const { data, error: loadError } = await supabase.from('accepted_loads').insert(loadWithUser);
  if (loadError) throw loadError;
  //   const { error: deleteError } = await supabase.from('loads').delete().eq('id', id);
  //   console.log(deleteError);
  return data;
};

export const useAcceptOffer = (user) => {
  return useMutation(['loads'], async (id) => await addAcceptedLoad(id, user), {
    onSuccess: async (data, id) => {
      console.log('succes id', id);
    },
    onError: (error: { message: string }) => {
      console.log(error);
    },
  });
};
