import React, { FunctionComponent, useState } from "react";
import useLogin from "../../logic/hook/useLogin";
import { EmailValidation } from "../../helper/userValidations";
import AlertError from "./AlertError";
import clsx from "clsx";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    paperLoginForm: {
      width: "300px",
      margin: "0 auto 0 auto",
      padding: "0px 0px 0px 0px",
    },
    wrapperCenter: {
      display: "flex",
      justifyContent: "center",
    },
    wrapperCenterForButton: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
    },
    h1Custom: {
      fontSize: "1.5em",
      color: "#525252",
      paddingLeft: "1rem",
    },
  })
);

/**
 * Login Function Component
 *
 * @visibleName Login View
 */
const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorText] = useState("Email inválido");
  const { isLoginLoading, hasLoginError, msg, login } = useLogin();
  const classes = useStyles();

  /**
   * Login
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  /**
   * Validate if the email is in the correct format
   * @param emailValue
   */
  const handleEmailChange = async (emailValue: string) => {
    setEmail(emailValue);

    if (
      !(await EmailValidation.isValid({
        email: emailValue,
      }))
    ) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }
  };

  return (
    <div>
      {!isLoginLoading && (
        <form
          id="LoginForm"
          data-testid="LoginForm"
          action="#"
          onSubmit={handleLoginSubmit}
        >
          <Paper className={clsx(classes.paperLoginForm)}>
            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>Login Form</h1>
            </div>
            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic"
                className="textfield-custom"
                label="Email"
                placeholder="daro@email.com"
                onChange={(e) => handleEmailChange(e.target.value)}
                value={email}
                {...(emailIsInvalid && {
                  error: true,
                  helperText: emailErrorText,
                })}
              />
            </div>
            <div className={clsx(classes.wrapperCenter)}>
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

            <div className={clsx(classes.wrapperCenter)}>
              <Link className={clsx(classes.linkClass)} href="/user/register">
                Register
              </Link>
            </div>

            <div className={clsx(classes.wrapperCenterForButton)}>
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
          <CircularProgress />
        </div>
      )}

      {hasLoginError && <AlertError msg={msg} />}
    </div>
  );
};

export default Login;
