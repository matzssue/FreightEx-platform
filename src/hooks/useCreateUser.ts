import { useMutation } from '@tanstack/react-query';
import supabase from '../config/supabase';
// import { useNotificationContext } from '../components/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { RegisterCompanyFormValues, RegisterUserFormValues } from '../utils/schemas/authSchema';

export type UserData = RegisterCompanyFormValues & RegisterUserFormValues;

const createUser = async (user: UserData) => {
  // Check if email exists

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
  //   const { setUser } = useUserContext();
  //   const notificationCtx = useNotificationContext();
  const standardAvatar =
    'https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80';

  const navigate = useNavigate();

  return useMutation((user: UserData) => createUser(user), {
    onSuccess: async (data, user: UserData) => {
      console.log(`data:`, data, `user:`, user);
      const { error } = await supabase
        .from('companies')
        .upsert([{ vat_id: user.vatId, name: user.companyName }]);
      console.log(error);
      if (error) throw new Error();

      const { data: insertData, error: insertError } = await supabase.from('users').insert({
        id: data.user?.id!,
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatar: standardAvatar,
        company_vat_id: user.vatId,
      });

      navigate('/');

      if (insertError) {
        throw insertError;
      }
      return insertData;
    },
    onError: (error: { message: string }) => {
      console.log(error);
    },
  });
}
