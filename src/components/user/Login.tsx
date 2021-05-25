import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import "./Login.css";

/**
 * Login
 *
 * @visibleName Login View
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoginLoading, hasLoginError, msg, login, isLogged, logout } =
    useUser();

  /**
   * Login
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  /**
   * Logout
   */
  const onClickLogoutHandler = (): void => {
    logout();
  };

  return (
    <div className="absoluteCenteredDiv">
      {isLoginLoading && <strong>Checking credentials...</strong>}

      {!isLogged && !isLoginLoading && (
        <form action="#" onSubmit={handleLoginSubmit}>
          <div className="box">
            <h1>Login Form</h1>
            <label className="login-label">Email</label>
            <input
              className="input"
              placeholder="nilson@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label className="login-label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="nilson"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button className="button">Login</button>
          </div>
        </form>
      )}
      <br />

      {isLogged && (
        <div className="box">
          <label className="logout-label">
            You are already logged! Do you want to log out?{" "}
          </label>
          <br />
          <button className="button" onClick={() => onClickLogoutHandler()}>
            Logout
          </button>
        </div>
      )}

      {hasLoginError && (
        <div className="message-error-box"><label className="error-label">
            Error: {msg}
            <br />{" "}  </label>
        </div>
      )}
    </div>
  );
}
