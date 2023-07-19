import styles from './PageLayout.module.scss';

import { Children, ReactNode, useState } from 'react';
import { UserBar } from '../modules/UserBar/components/UserBar';
import { AsideMenu } from '../modules/Home/AsideMenu/components/AsideMenu';
import Wrapper from './Wrapper';

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  return (
    <>
      <UserBar setShowMenu={setShowMenu} />
      <div className={styles.box}>
        <AsideMenu showMenu={showMenu} />
        <Wrapper showMenu={showMenu}>{children}</Wrapper>
      </div>
    </>
  );
};
