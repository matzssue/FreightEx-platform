import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { getSafeContext } from '../../utils/helpers/getSateContext';
import { getUser } from '../../utils/api/supabase/User/getUser';
import { UserDatabase } from '../../utils/api/supabase/types';
import { changeAvatar } from '../../utils/api/supabase/User/changeAvatar';
import { updateUserField } from '../../utils/api/supabase/User/updateUserField';

type UserContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
  setUserId: Dispatch<SetStateAction<string | undefined>>;
  logIn: () => void;
  logOut: () => void;
  userData: UserDatabase | undefined;
  changeUserAvatar: (file: any) => Promise<void>;
  changeUserField: (field: string, newValue: string) => Promise<void>;
};

export const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDatabase | undefined>();

  const logOut = () => {
    setIsLoggedIn(false);
  };
  const logIn = () => {
    setIsLoggedIn(true);
  };
  const changeUserAvatar = async (file: File) => {
    if (!userId) return;
    const change = await changeAvatar(file, userId);
    setUserData(change);
  };

  const changeUserField = async (field: string, newValue: string) => {
    if (!userId) return;
    const newData = await updateUserField(userId, field, newValue);
    setUserData(newData);
  };

  useEffect(() => {
    const getUserData = async () => {
      if (!userId) return;
      const userData = await getUser(userId);
      setUserData(userData);
    };
    getUserData();
  }, [userId]);

  const valueContext = {
    userId,
    isLoggedIn,
    logOut,
    setUserId,
    logIn,
    setIsLoggedIn,
    userData,
    changeUserAvatar,
    changeUserField,
  };

  return <UserContext.Provider value={valueContext}>{children}</UserContext.Provider>;
};

export const useUserContext = getSafeContext(UserContext, 'User Context');
