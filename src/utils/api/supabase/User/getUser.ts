import { useEffect, useState } from 'react';
import supabase from '../../../../config/supabase';
import { useUserContext } from '../../../../store/contexts/UserContext';

export const getUser = async (userId) => {
  if (!userId) return;
  console.log(userId);
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  console.log(data);
  // setUserData(data);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
