import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import styles from './UserBar.module.scss';
import { GiHamburgerMenu } from 'react-icons/gi';

import { AddLoadForm } from '../../../Loads/components/Load/AddLoad/AddLoadForm/AddLoadForm';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { useAppDispatch } from '../../../../store/hooks';

import { openModal } from '../../../../store/reducers/modalSlice';
import { useUserContext } from '../../../../store/contexts/UserContext';
import { useNavigate } from 'react-router';
import { useLogout } from '../../../../hooks/useLogout';
import { NotificationBox } from '../NoticiationBox/NotificationBox';

export const UserBar = ({ setShowMenu }: { setShowMenu: Dispatch<SetStateAction<boolean>> }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData, userId } = useUserContext();
  const logoutMutation = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const openMenuHandler = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;
    switch (target.id) {
      case 'profile':
        navigate('/profile');
        break;
      case 'account':
        navigate(`/account/${userId}`);
        break;
      case 'signOut':
        logoutMutation.mutate();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <AddLoadForm />
      <button
        aria-label='toggle sidebar'
        className={styles['hamburger-button']}
        onClick={() => setShowMenu((prevValue: boolean) => !prevValue)}
      >
        <GiHamburgerMenu />
      </button>
      <button onClick={() => dispatch(openModal())} className={styles['freight-button']}>
        Add Freight
      </button>
      <NotificationBox />
      {userData && <span>{`${userData.name} (${userData.company_vat_id}) `}</span>}
      <IconButton onClick={openMenuHandler} size='small' sx={{ ml: 2 }}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            cursor: 'pointer',
            border: '5px solid transparent',
            ':hover': { borderColor: '#3c5f77' },
          }}
          alt={`User photo`}
          src={`https://cxupvaymlpdeyyrdrpkn.supabase.co/storage/v1/object/public/images/${userData?.avatar}`}
        />
      </IconButton>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        onClick={handleMenuOption}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        <MenuItem id='account' onClick={handleClose}>
          <ListItemIcon>
            <FaUser />
          </ListItemIcon>
          Account
        </MenuItem>
        <MenuItem id='signOut' onClick={handleClose}>
          <ListItemIcon>
            <MdLogout />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};
