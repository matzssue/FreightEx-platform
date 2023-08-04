import { useEffect, useState } from 'react';
import supabase from '../config/supabase';
import { useUserContext } from '../store/contexts/UserContext';

export const useUser = (userId) => {
  const [userData, setUserData] = useState([]);

  const getUserInfo = async () => {
    console.log(userId);
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
    console.log(data);
    setUserData(data);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return userData;
};
