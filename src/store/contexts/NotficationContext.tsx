import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getSafeContext } from 'src/utils/helpers/getSateContext';
import { toast } from 'react-toastify';

type NotificationContextProps = {
  clear: () => void;
  notifications: Notification[];
  notify: (type: 'success' | 'error', text: string) => void;
  deleteNotification: (id: string) => void;
};

type Notification = {
  type: 'success' | 'error';
  text: string;
  id: string;
};

export const NotificationContext = React.createContext<NotificationContextProps | null>(null);

export const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: 'success' | 'error', text: string) => {
    const notification = { type, text, id: uuidv4() };
    setNotifications((prevValues) => [...prevValues, notification]);
  };

  const notify = (type: 'success' | 'error', text: string) => {
    if (type === 'success') {
      success(text);
    }
    if (type === 'error') {
      error(text);
    }

    addNotification(type, text);
  };

  const success = (text: string) => {
    toast.success(text);
  };

  const error = (text: string) => {
    toast.error(text);
  };

  const clear = () => {
    setNotifications([]);
  };
  const deleteNotification = (id: string) => {
    const filteredNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(filteredNotifications);
  };

  return (
    <NotificationContext.Provider
      value={{
        notify,
        notifications,
        clear,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotificationContext = getSafeContext(NotificationContext, 'Notification Context');
