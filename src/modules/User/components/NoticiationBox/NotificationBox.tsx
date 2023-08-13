import styles from './NotificaitionBox.module.scss';
import { ReactNode, useState, useEffect } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  NotificationCenterItem,
  useNotificationCenter,
} from 'react-toastify/addons/use-notification-center';
import { toast } from 'react-toastify';
import { Badge } from '@mui/material';

import { AiOutlineClose } from 'react-icons/ai';
import { Title } from '../../../../common/Title/Title';
import { BsPatchCheck, BsPatchCheckFill } from 'react-icons/bs';
export const NotificationBox = () => {
  const { notifications, clear, markAllAsRead, markAsRead } = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);
  const [savedNotifications, setSavedNotifications] = useState<NotificationCenterItem[] | null>([]);
  const toggleNotificationBox = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');

    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      setSavedNotifications(parsedNotifications);
    }
  }, []);

  useEffect(() => {
    if (notifications.length <= 0) return;
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const clearHandler = () => {
    clear();
    setSavedNotifications(null);
    localStorage.setItem('notifications', JSON.stringify([]));
  };

  console.log('save', savedNotifications, 'notifi', notifications);
  const selectNotifications =
    savedNotifications && savedNotifications.length > 0 ? savedNotifications : notifications;

  console.log(selectNotifications);
  return (
    <div className={styles['notifications-box']}>
      <button onClick={toggleNotificationBox} className={styles['notification-button']}>
        <Badge badgeContent={selectNotifications.length}>
          <IoMdNotificationsOutline />
        </Badge>
      </button>
      <button onClick={() => toast.success('succ')}> add</button>
      {isOpen && (
        <div className={styles['notifications-container']}>
          <Title title='Notifications' />
          <ul>
            {selectNotifications.length > 0 ? (
              selectNotifications.map((notification, i) => {
                return (
                  <li key={i} className={styles[notification.type as string]}>
                    <span>{notification.content as ReactNode} </span>
                    {notification.read ? (
                      <BsPatchCheckFill />
                    ) : (
                      <button
                        className={styles['mark-button']}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <BsPatchCheck />
                      </button>
                    )}
                  </li>
                );
              })
            ) : (
              <p className={styles['no-results']}>No new notifications</p>
            )}
          </ul>

          <button className={styles['read-all_button']} onClick={markAllAsRead}>
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
