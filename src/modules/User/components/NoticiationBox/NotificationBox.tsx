import styles from './NotificaitionBox.module.scss';
import { ReactNode, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { Badge } from '@mui/material';

import { AiOutlineClose } from 'react-icons/ai';
import { Title } from '../../../../common/Title/Title';
import { BsPatchCheck, BsPatchCheckFill } from 'react-icons/bs';
export const NotificationBox = () => {
  const { notifications, clear, markAllAsRead, markAsRead, remove, unreadCount } =
    useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotificationBox = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const clearHandler = () => {
    clear();
  };

  return (
    <div className={styles['notifications-box']}>
      <button onClick={toggleNotificationBox} className={styles['notification-button']}>
        <Badge badgeContent={unreadCount}>
          <IoMdNotificationsOutline />
        </Badge>
      </button>
      {isOpen && (
        <div className={styles['notifications-container']}>
          <Title title='Notifications' />
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                return (
                  <li key={notification.id} className={styles[notification.type as string]}>
                    <button
                      className={styles['notification']}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <span>{notification.content as ReactNode} </span>
                      {notification.read ? <BsPatchCheckFill /> : <BsPatchCheck />}
                    </button>
                    <button className={styles.remove} onClick={() => remove(notification.id)}>
                      X
                    </button>
                  </li>
                );
              })
            ) : (
              <p className={styles['no-results']}>No new notifications</p>
            )}
          </ul>

          <button className={styles['read-all_button']} onClick={() => markAllAsRead()}>
            Read all
          </button>
          <button className={styles['clear-button']} onClick={() => clearHandler()}>
            Clear
          </button>
          <button className={styles['close-button']} onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};
