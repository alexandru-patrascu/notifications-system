import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "providers/AuthProvider";

import "./styles.css";
import axios from "axios";
import { User } from "types";

const { REACT_APP_API_URL } = process.env;

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const { data: userData } = await axios.post<{ user: User }>(
      `${REACT_APP_API_URL}/api/login`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    loginUser(userData.user);
    navigate("/notifications");
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input required id="username" name="username" />

          <label htmlFor="password">Password</label>
          <input required type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
