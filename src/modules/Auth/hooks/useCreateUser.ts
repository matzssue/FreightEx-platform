// import { useNotificationContext } from '../components/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import supabase from '../../../config/supabase';
import {
  RegisterCompanyFormValues,
  RegisterUserFormValues,
} from '../../../utils/schemas/authSchema';
export type UserData = RegisterCompanyFormValues & RegisterUserFormValues;

const createUser = async (user: UserData) => {
  const { data, error: registerError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (registerError) {
    throw registerError;
  }

  return data;
};

export default function useCreateUser() {
  const navigate = useNavigate();

  return useMutation((user: UserData) => createUser(user), {
    onSuccess: async (data, user: UserData) => {
      const { error } = await supabase
        .from('companies')
        .upsert([{ vat_id: user.vatId, name: user.companyName }]);
      if (error) throw new Error();
      if (!data.user) return;
      const { data: insertData, error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        company_vat_id: user.vatId,
      });
      toast.success('Account created successfully');
      toast.info(
        `Please check your email inbox and click on the verification link we've sent to confirm your email address`,
      );
      navigate('/login');

      if (insertError) {
        throw insertError;
      }
      return insertData;
    },
    onError: (error: { message: string }) => {
      toast.error(`Something  went wrong: ${error.message}`);
    },
  });
}
