import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/config/supabase';

import { UserDatabase } from '../../utils/api/supabase/types';
import { getUser } from '../../utils/api/supabase/User/getUser';
import { getSafeContext } from '../../utils/helpers/getSateContext';
type UserContextProps = {
  changeUserInformations: (...props: any) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  isNavigationOpen: boolean;
  logIn: () => void;
  logOut: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUserId: Dispatch<SetStateAction<string | undefined>>;
  toggleNavigation: () => void;
  userData: UserDatabase;
  userId: string | undefined;
};

type UpdateUserCallback = (...updateData: any) => Promise<UserDatabase>;
export const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>();
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDatabase>({
    avatar: '',
    company_vat_id: '',
    email: '',
    id: '',
    name: '',
    surname: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const logOut = () => {
    setIsLoggedIn(false);
  };
  const logIn = () => {
    setIsLoggedIn(true);
  };
  const toggleNavigation = () => {
    setIsNavigationOpen((prevValue) => !prevValue);
  };

  const changeUserInformations = async (
    updateFunction: UpdateUserCallback,
    ...updateData: (string | File)[]
  ) => {
    if (!userId) return;
    const newData = await updateFunction(userId, ...updateData);
    if (newData) setUserData(newData);
  };

  useEffect(() => {
    setIsLoading(true);
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        setUserId(session?.user.id);
        setIsLoggedIn(true);
        setIsLoading(false);
      }
      if (!session) {
        setIsLoading(false);
        setIsLoggedIn(false);
        navigate('/login');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (!userId) return;
      try {
        const userData = await getUser(userId);
        if (userData) setUserData(userData);
      } catch (err) {
        setUserId(undefined);
      }
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
    setIsLoading,
    isLoading,
    isNavigationOpen,
    toggleNavigation,
  };

  return <UserContext.Provider value={valueContext}>{children}</UserContext.Provider>;
};

export const useUserContext = getSafeContext(UserContext, 'User Context');
