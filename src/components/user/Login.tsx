import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoginLoading, hasLoginError, msg, login, isLogged, logout } = useUser();

  /**
   * Login
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
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
          email
            <input
              placeholder="nilson@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            password
            <input
              type="password"
              placeholder="nilson"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <button className="login-button">Login</button>
        </form>
      )}
      {hasLoginError && <strong>Error</strong>}
      <br/> Msg:{msg}
    </div>
  );
}
