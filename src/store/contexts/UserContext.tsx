import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { getSafeContext } from '../../utils/helpers/getSateContext';
import { getUser } from '../../utils/api/supabase/User/getUser';
import { UserDatabase } from '../../utils/api/supabase/types';

type UserContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
  setUserId: Dispatch<SetStateAction<string | undefined>>;
  logIn: () => void;
  logOut: () => void;
  userData: UserDatabase | undefined;
  changeUserInformations: (...props: any) => void;
};

type UpdateUserCallback = (...updateData: any) => Promise<UserDatabase>;

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

  const changeUserInformations = async (
    updateFunction: UpdateUserCallback,
    ...updateData: (string | File)[]
  ) => {
    if (!userId) return;
    const newData = await updateFunction(userId, ...updateData);
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
    changeUserInformations,
  };

  return <UserContext.Provider value={valueContext}>{children}</UserContext.Provider>;
};

export const useUserContext = getSafeContext(UserContext, 'User Context');
