import supabase from '../../../../config/supabase';
import { useUserContext } from '../../../../store/contexts/UserContext';

export const changeAvatar = async (file: File, userId: string) => {
  try {
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(file.name, file, { cacheControl: '3600', upsert: true });

    if (uploadError) throw uploadError;

    const { data: userData, error } = await supabase
      .from('users')
      .update({ avatar: file.name })
      .eq('id', userId)
      .select()
      .single();
    console.log(userData);
    if (error) throw error;
    return userData;
  } catch (err) {
    console.log(err);
  }
};
