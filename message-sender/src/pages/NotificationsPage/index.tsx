import React from "react";

import { User } from "types";
import { useSocket, useApi } from "hooks";
import { Error, Loading } from "components";
import { NOTIFICATION_TYPES_ARRAY } from "config";

import "./styles.css";

const NotificationsPage = () => {
  const socket = useSocket();

  const { response, isLoading, error } = useApi<{ users: User[] }>(
    "/api/users"
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const message = form["message"].value;
    const to = form["to"].value;
    const type = form["type"].value;

    try {
      socket.send(
        JSON.stringify({
          message,
          to,
          type,
          from: JSON.parse(window.localStorage.getItem("user") as string)?._id,
        })
      );

      const resetForm = document.getElementById(
        "message-sender-form"
      ) as HTMLFormElement;

      resetForm.reset();
    } catch (error) {
      alert("Failed to send notification");
    }
  };

  return (
    <div className="notifications-page">
      <form id="message-sender-form" onSubmit={handleSubmit}>
        <h3>Send notification</h3>

        <label htmlFor="message">Message*</label>
        <textarea required id="message" name="message" />

        <div className="dropdowns-container">
          <div className="dropdowns-wrapper">
            <label htmlFor="to">To</label>
            <select required id="to" name="to">
              {response?.users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdowns-wrapper">
            <label htmlFor="type">Type</label>
            <select required id="type" name="type">
              {NOTIFICATION_TYPES_ARRAY.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default NotificationsPage;
