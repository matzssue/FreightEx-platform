import supabase from '../../../../config/supabase';

export const updateUserField = async (userId: string, field: string, newValue: string) => {
  if (field !== 'name' && field !== 'surname') {
    throw new Error('Invalid field name. Only "name" and "surname" are allowed.');
  }
  const updateData = { [field]: newValue };
  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
