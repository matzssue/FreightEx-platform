import supabase from '../../../../config/supabase';

export const changeUserName = async (userId: string, newValue: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ name: newValue })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
export const changeUserSurname = async (userId: string, newValue: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ surname: newValue })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
