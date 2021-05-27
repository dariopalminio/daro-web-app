import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
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
    <div>
      {!isLogged && !isLoginLoading && (
        <form action="#" onSubmit={handleLoginSubmit}>
          <Paper className="paper-custom">
            <div className="wrapper-center">
              {" "}
              <h1>Login Form</h1>
            </div>
            <div className="wrapper-center">
              <TextField
                id="standard-basic"
                className="textfield-custom"
                label="Email"
                placeholder="nilson@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />{" "}
            </div>
            <div className="wrapper-center">
              <TextField
                id="standard-basic"
                className="textfield-custom"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <b />

            <div className="wrapper-center-for-button">
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </div>
          </Paper>
        </form>
      )}
      <br />

      {isLoginLoading && (
        <div className="box">
          <strong>Checking credentials...</strong>
        </div>
      )}

      {isLogged && (
        <div className="box">
          <Alert severity="success">
            You are already logged! Do you want to log out?{" "}
          </Alert>
          <br />
          <div className="wrapper-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClickLogoutHandler()}
            >
              Logout
            </Button>
          </div>
        </div>
      )}

      {hasLoginError && (
        <div className="wrapper-center">
          <Alert severity="error">
            Error: {msg}
            <br />{" "}
          </Alert>
        </div>
      )}
    </div>
  );
}
