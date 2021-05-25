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
        <form action="index.html" onSubmit={handleLoginSubmit}>
          <div className="box">
            <h1>Login Form</h1>
            <input
              className="username"
              placeholder="nilson@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              className="username"
              type="password"
              placeholder="nilson"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button className="button">Login</button>
          </div>
        </form>
      )}
<br/>
      {isLogged && (
        <div className="box">
          Do you want to log out? <br />
          <button className="button" onClick={() => onClickLogoutHandler()}>Logout</button>
        </div>
      )}
      <div className="message-box">
        {hasLoginError && <strong>Error: </strong>}
        {msg} <br />
        {isLogged && <label>You are already logged! </label>}
      </div>
    </div>
  );
}
