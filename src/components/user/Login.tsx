import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoginLoading, hasLoginError, login, isLogged, logout } = useUser();

  /**
   * Login
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username, password });
  };

  /**
   * Logout
   */
  const onClickLogoutHandler = (): void => {
    logout();
  };

  return (
    <div>
      {isLogged && (
        <div>
          You are already logged{" "}
          <button onClick={() => onClickLogoutHandler()}>Logout</button>
        </div>
      )}
      {isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLogged && !isLoginLoading && (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label>
            username
            <input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </label>

          <label>
            password
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <button className="login-button">Login</button>
        </form>
      )}
      {hasLoginError && <strong>Credentials are invalid</strong>}
    </div>
  );
}
