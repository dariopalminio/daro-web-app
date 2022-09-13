import React, { FunctionComponent, useState } from "react";
import useLogin from "../../../../../domain/hook/user/login.hook";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import AlertError from "../alert-error";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import button_background from "../../../style/buttonbackground";

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
    buttonCustom: {
      margin: "0 auto auto auto",
      background: button_background,
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
  const [emailErrorText] = useState("Invalid email");
  const {
    isProcessing,
    hasError,
    msg,
    isSuccess,
    login,
  } = useLogin();
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();
  const { t } = useTranslation();

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

    if (!(await validator.emailIsValid(emailValue))) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }
  };

  return (
    <div>

      {!isSuccess && (
        <form
          id="LoginForm"
          data-testid="LoginForm"
          action="#"
          onSubmit={handleLoginSubmit}
        >
          <Paper className={clsx(classes.paperLoginForm)}>
            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>
              {t('login.title')}
              </h1>
            </div>
            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic"
                className="textfield-custom"
                label="Email"
                placeholder="your@email.com"
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
                label={t('login.label.password')}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <b />

            <div className={clsx(classes.wrapperCenter)}>
              <Link className={clsx(classes.linkClass)} href="/user/register/form">
              {t('register.command.link')}
              </Link>
              &nbsp;&nbsp;
              <Link className={clsx(classes.linkClass)} href="/user/recovery/start">
              {t('recovery.command.link')}
              </Link>
            </div>

            <div className={clsx(classes.wrapperCenterForButton)}>
              <Button className={clsx(classes.buttonCustom)}
              variant="contained" color="primary" type="submit">
              {t('login.command')}
              </Button>
            </div>
          </Paper>
        </form>
      )}

      <br />

      {isProcessing && (
        <div className="box">
          <strong>{t('login.info.loading')}</strong>
          <CircularProgress />
        </div>
      )}

      {hasError && <AlertError msg={t(msg)} />}

    </div>
  );
};

export default Login;
