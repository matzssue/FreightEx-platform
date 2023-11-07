import { toast } from 'react-toastify';
import { UserAttributes } from '@supabase/supabase-js';

import supabase from '../../../config/supabase';

type Credentials = 'password' | 'email';

export const changeCredientials = async (credential: Credentials, newValue: string) => {
  const updateData = { [credential]: newValue } as UserAttributes;

  try {
    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw error;
    if (data) toast.success(`${credential} updated`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error('Something went wrong, please try again later');
    }
  }
};
