import React from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "providers/AuthProvider";

import "./styles.css";

const Layout = () => {
  const { logoutUser } = useAuth();

  return (
    <div className="layout">
      <div className="nav-bar">
        <h3>Message Sender</h3>
        <button type="button" onClick={logoutUser}>
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
