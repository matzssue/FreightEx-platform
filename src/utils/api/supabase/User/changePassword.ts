import { toast } from 'react-toastify';

import supabase from '../../../../config/supabase';

export const changePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    if (data) toast.success('Password updated');
    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error('Something went wrong, please try again');
    }
  }
};
