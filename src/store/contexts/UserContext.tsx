import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { getSafeContext } from '../../utils/helpers/getSateContext';
import { useUser } from '../../hooks/useUser';
// import { useUser } from '../../hooks/useUser';
type User = {
  email?: string;
  name?: string | undefined;
  surname?: string | undefined;
  avatar: string;
  userId: string;
  password?: string | undefined;
};

type UserContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  logIn: (loginData: User) => void;
  logOut: () => void;
  user: User;

  setUser: Dispatch<SetStateAction<User>>;
};

export const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(user);
  const logOut = () => {
    setIsLoggedIn(false);
  };
  const logIn = () => {
    setIsLoggedIn(true);
  };
  const valueContext = {
    user,
    isLoggedIn,
    logOut,
    setUser,
    logIn,
    setIsLoggedIn,
  };

  return <UserContext.Provider value={valueContext}>{children}</UserContext.Provider>;
};

export const useUserContext = getSafeContext(UserContext, 'User Context');
