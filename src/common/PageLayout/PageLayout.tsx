import styles from './PageLayout.module.scss';

import { ReactNode, useState } from 'react';
import { UserBar } from '../../modules/User/components/UserBar/UserBar';
import { AsideMenu } from '../../modules/Home/components/AsideMenu/AsideMenu';
import Wrapper from '../Wrapper/Wrapper';

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
