import supabase from '../../../../config/supabase';

export const getUser = async (userId: string) => {
  if (!userId) return;

  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
