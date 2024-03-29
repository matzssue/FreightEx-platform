import { ReactNode, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Badge } from '@mui/material';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';

import { Title } from '../../../../common/Title/Title';

import styles from './NotificaitionBox.module.scss';
export const NotificationBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotificationBox = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const { notifications, deleteNotification, clear } = useNotificationContext();

  return (
    <div className={styles['notifications-box']}>
      <button onClick={toggleNotificationBox} className={styles['notification-button']}>
        <Badge badgeContent={notifications.length}>
          <IoMdNotificationsOutline />
        </Badge>
      </button>
      {isOpen && (
        <div className={styles['notifications-container']}>
          <Title title='Notifications' />
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id} className={styles[notification.type as string]}>
                  <span className={styles.notification}>{notification.text as ReactNode} </span>

                  <button
                    className={styles.remove}
                    onClick={() => deleteNotification(notification.id)}
                  >
                    X
                  </button>
                </li>
              ))
            ) : (
              <p className={styles['no-results']}>No new notifications</p>
            )}
          </ul>

          <button className={styles['clear-button']} onClick={() => clear()}>
            Clear
          </button>
          <button className={styles['close-notifications-button']} onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};
