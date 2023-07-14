import { Avatar } from '@mui/material';
import styles from './UserBar.module.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { AddLoad } from '../../Loads/LoadsList/components/AddLoad/AddLoad';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import { openModal, closeModal } from '../../../store/reducers/modalSlice';

export const UserBar = ({ setShowMenu }) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.isLoadModalOpen);

  return (
    <div className={styles.container}>
      <AddLoad />
      <button
        className={styles['hamburger-button']}
        onClick={() => setShowMenu((prevValue) => !prevValue)}
      >
        <GiHamburgerMenu />
      </button>
      <button onClick={() => dispatch(openModal())} className={styles['freight-button']}>
        Add Freight
      </button>
      <button className={styles['notification-button']}>
        <IoMdNotificationsOutline />
      </button>
      <Avatar
        sx={{ width: 30, height: 30, cursor: 'pointer' }}
        alt={`Mateusz photo`}
        src='https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
      />
    </div>
  );
};
