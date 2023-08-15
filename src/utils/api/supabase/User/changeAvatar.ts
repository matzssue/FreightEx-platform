import supabase from '../../../../config/supabase';
import { toast } from 'react-toastify';
export const changeAvatar = async (userId: string, file: File) => {
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

    if (userData) toast.success('Avatar updated ');
    if (error) throw error;
    return userData;
  } catch (e) {
    if (e instanceof Error) {
      toast.error('Something went wrong while changing avatar, please try again');
    }
  }
};
