import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from "react";
import clsx from "clsx";
import SessionContext, {
  ISessionContext,
} from "../../../../domain/context/session.context";
import useRegisterConfirm from "../../../../domain/hook/register.confirm.hook";
import { Redirect } from 'react-router';
import emailToConfirmImage from "../../../../application/ui/image/email_to_confirm.png";
import { useAtom } from "jotai";
import { LoginPassAtom } from "../../../../domain/atom/login.pass.atom";
import useLogin from "../../../../domain/hook/login.hook";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * + *": {
        justifyContent: "center",
        textAlign: "center",
      },
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
    },
  })
);

/**
 * Verify Register Confirm Component
 * View to send email and automatically login.
 * @visibleName UserRegisterConfirm
 */
const UserRegisterConfirm: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const [password] = useAtom(LoginPassAtom);
  const { isLoginLoading, hasLoginError, msg, login } = useLogin();

  const {
    wasConfirmedOk,
    isRegisterLoading,
    hasRegisterError,
    confirmMsg,
    redirect,
    startConfirmEmail,
  } = useRegisterConfirm();

  const classes = useStyles();

  /**
   * Handle send email with verification link.
   */
  const handleSendEmail = async () => {
    if (session?.email) {
      //first: send email
      const userName = session?.given_name ? session?.given_name : "";
      const userEmail = session?.email;
      startConfirmEmail(userName, userEmail);
      //second: login
      handleAutomaticLogin(userEmail);
    }
  };

  /**
   * Handle Automatic login.
   * @param email 
   */
  const handleAutomaticLogin = async (email: string) => {
    login(email, password);
  };

  return (
    <div>
      {redirect && (<Redirect to='/' />)}

      {wasConfirmedOk && (
        <Alert severity="success">
          Your account has been confirmed successfully. Now you must go to
          login.
        </Alert>
      )}
      {!session?.email_verified && (

          <Paper className={clsx(classes.paperLoginForm)}>
            <Alert severity="success">
              Your account has been temporarily created successfully. Now you
              must verify your mail.
            </Alert>
            <div className={clsx(classes.wrapperCenter)}>
            <img src={String(emailToConfirmImage)} alt="emailToConfirmImage" style={{width:"45%", height:"45%"}}/>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>Email verification</h1>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <Button
                className={clsx(classes.buttonCustom)}
                variant="contained"
                color="primary"
                onClick={() => handleSendEmail()}
              >
                Send email and login
              </Button>
            </div>

            <div className={clsx(classes.wrapperCenterForButton)}>
     
            </div>
          </Paper>
     
      )}
      {hasRegisterError && <Alert severity="error">{confirmMsg}</Alert>}

      {isRegisterLoading && <Alert severity="info">{confirmMsg}</Alert>}

      {(isLoginLoading || isRegisterLoading) && (<CircularProgress />)}

    </div>
  );
};

export default UserRegisterConfirm;
