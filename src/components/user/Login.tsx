import React, { useState, useContext } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import useUser from "../../hooks/useUser";
import { emailIsValid } from "../../commons/userValidations";
import "./Login.css";
import UserContext, { UserContextType } from "../../context/UserContext";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * + *": {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    linkClass: {
      paddingTop: "1.5em",
      position: "relative",
      rigt: "1em",
    },
  })
);

/**
 * Login
 *
 * @visibleName Login View
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailNotValid, setEmailNotValid] = useState(false);
  const { user } = useContext(UserContext) as UserContextType;
  const { isLoginLoading, hasLoginError, msg, login, logout } = useUser();
  const classes = useStyles();

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

  /**
   * Validate if the email is in the correct format
   * @param emailValue 
   */
  const validateEmail = (emailValue: string): void => {

    setEmail(emailValue)

    if (!emailIsValid(emailValue)) {
      setEmailNotValid(true)
    }else{
      setEmailNotValid(false)
    }
  };

  return (
    <div id="LoginFormContainer" data-testid="LoginFormContainer">
      {!user?.isLogged && !isLoginLoading && (
        <form
          id="LoginForm"
          data-testid="LoginForm"
          action="#"
          onSubmit={handleLoginSubmit}
        >
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
                onChange={(e) => validateEmail(e.target.value)}
                value={email}
                {...(emailNotValid && { error: true, helperText: 'Email inválido' })}
              />{" "}
            </div>
            <div className="wrapper-center">
              <TextField
                id="standard-basic-2"
                className="textfield-custom"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <b />

            <div className="wrapper-center">
              <Link className={clsx(classes.linkClass)} href="/user/register">
                Register
              </Link>
            </div>

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

      {user?.isLogged && (
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
