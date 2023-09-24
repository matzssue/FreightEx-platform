import styles from './PageLayout.module.scss';

import { ReactNode } from 'react';
import { UserBar } from '../../modules/User/components/UserBar/UserBar';
import { AsideMenu } from '../../modules/Home/components/AsideMenu/AsideMenu';
import Wrapper from '../Wrapper/Wrapper';
import { useUserContext } from 'src/store/contexts/UserContext';

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
