import { ReactNode } from 'react';
import { useUserContext } from 'src/store/contexts/UserContext';

import { AsideMenu } from '../../modules/Home/components/AsideMenu/AsideMenu';
import { UserBar } from '../../modules/User/components/UserBar/UserBar';
import Wrapper from '../Wrapper/Wrapper';

import styles from './PageLayout.module.scss';

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const { toggleNavigation, isNavigationOpen } = useUserContext();
  return (
    <>
      <UserBar setShowMenu={toggleNavigation} />
      <div className={styles.box}>
        <AsideMenu showMenu={isNavigationOpen} />
        <Wrapper showMenu={isNavigationOpen}>{children}</Wrapper>
      </div>
    </>
  );
};
