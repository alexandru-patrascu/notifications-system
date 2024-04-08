import { useCallback, useEffect, useState } from "react";

import { useSocket } from "hooks";
import { Notification } from "types";
import { formatDateAndTime } from "utils";

import "./styles.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socket = useSocket();

  const onMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);

    if (data?.data) {
      setNotifications((prevNotifications) => {
        const newNotifications = Array.isArray(data.data)
          ? data.data
          : [data.data];
        const updatedNotifications = [
          ...newNotifications,
          ...prevNotifications,
        ];

        return updatedNotifications;
      });
    }
  }, []);

  useEffect(() => {
    socket.addEventListener("message", onMessage);

    return () => {
      socket.addEventListener("message", onMessage);
    };
  }, [socket, onMessage]);

  return (
    <div className="notifications-page">
      <div className="notifications-wrapper">
        <h1>Notifications</h1>
        {notifications.map((notification) => {
          const { date, time } = formatDateAndTime(notification.createdAt);
          return (
            <div
              key={notification._id}
              className={`notification border-${notification.type}`}
            >
              <p>{notification.message}</p>
              <div className="date">
                <p>{date}</p>
                <p>{time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
