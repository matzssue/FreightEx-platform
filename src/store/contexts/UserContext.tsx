import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { getSafeContext } from '../../utils/helpers/getSateContext';
import { useUser } from '../../hooks/useUser';
import { UserDatabase } from '../../utils/api/supabase/types';

type UserContextProps = {
  isLoggedIn: boolean;
  user: string | undefined;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  logIn: () => void;
  logOut: () => void;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  userData: UserDatabase | undefined;
};

export const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDatabase | undefined>();

  const logOut = () => {
    setIsLoggedIn(false);
  };
  const logIn = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await useUser(user);
      setUserData(userData);
    };
    getUserData();
  }, [user]);

  const valueContext = {
    user,
    isLoggedIn,
    logOut,
    setUser,
    logIn,
    setIsLoggedIn,
    userData,
  };

  return <UserContext.Provider value={valueContext}>{children}</UserContext.Provider>;
};

export const useUserContext = getSafeContext(UserContext, 'User Context');
