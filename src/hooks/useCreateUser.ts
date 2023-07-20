import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../config/supabase';
// import { useNotificationContext } from '../components/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useUserContext } from '../components/contexts/UserContext';

type User = {
  userId?: string;
  email: string;
  name?: string;
  surname: string;
  password: string;
};

const createUser = async (user: User) => {
  // Check if email exists

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export default function useCreateUser() {
  //   const { setUser } = useUserContext();
  //   const notificationCtx = useNotificationContext();
  const standardAvatar =
    'https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80';
  const navigate = useNavigate();
  return useMutation((user: User) => createUser(user), {
    onSuccess: async (data, user) => {
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
      //   setUser({
      //     userId: data?.user?.id!,
      //     name: user.name,
      //     surname: user.surname,
      //     avatar: standardAvatar,
      //   });

      navigate('/');

      if (insertError) {
        throw insertError;
      }
      return insertData;
    },
    onError: (error: { message: string }) => {
      //   notificationCtx?.error(`sorry ${error.message}`);

      console.log(error);
    },
  });
}
