import { useMutation } from '@tanstack/react-query';
import supabase from '../config/supabase';
// import { useNotificationContext } from '../components/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { RegisterCompanyFormValues, RegisterUserFormValues } from '../utils/schemas/authSchema';
import { toast } from 'react-toastify';
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

      const { data: insertData, error: insertError } = await supabase.from('users').insert({
        id: data.user?.id!,
        name: user.name,
        surname: user.surname,
        email: user.email,
        company_vat_id: user.vatId,
      });
      toast.success('Account created successfully');
      navigate('/login');

      if (insertError) {
        throw insertError;
      }
      return insertData;
    },
    onError: (error: { message: string }) => {
      console.log(error);
      toast.error(`Something  went wrong: ${error.message}`);
    },
  });
}
