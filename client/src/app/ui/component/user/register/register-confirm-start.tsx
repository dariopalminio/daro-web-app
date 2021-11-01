import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from "react";
import clsx from "clsx";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import useRegisterConfirmStart from "../../../../../domain/hook/user/register-confirm-start.hook";
import { Redirect } from 'react-router';
import emailToConfirmImage from "../../../image/email_to_confirm.png";
import { useTranslation } from 'react-i18next';

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
const RegisterConfirmStart: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  
  const {
    wasConfirmedOk,
    isRegisterLoading,
    hasRegisterError,
    confirmMsg,
    redirect,
    startConfirmEmail,
  } = useRegisterConfirmStart();



  /**
   * Handle send email with verification link.
   */
  const handleSendEmail = async () => {

      const userName = session?.given_name ? session?.given_name : "";
      const userEmail: string | undefined = session?.email;
      console.log("startConfirmEmail with ", userEmail);
      startConfirmEmail(userName, userEmail);
  };

  /**
   * Handle Automatic login.
   * @param email 
   */
  const handleAutomaticLogin = async (email: string) => {
    //login(email, password);
  };

  return (
    <div>
      {redirect && (<Redirect to='/user/auth' />)}

      {wasConfirmedOk && (
        <Alert severity="success">
          {t('register.start.success.account.confirmed')}
        </Alert>
      )}
      {!session?.email_verified && (

          <Paper className={clsx(classes.paperLoginForm)}>
            <Alert severity="success">
              {t('register.start.success.temporarily.created')}
            </Alert>
            <div className={clsx(classes.wrapperCenter)}>
            <img src={String(emailToConfirmImage)} alt="emailToConfirmImage" style={{width:"45%", height:"45%"}}/>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>
                {t('register.start.title.email.verirication')}
              </h1>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <Button
                className={clsx(classes.buttonCustom)}
                variant="contained"
                color="primary"
                onClick={() => handleSendEmail()}
              >
                {t('register.command.email.send')}
              </Button>
            </div>

            <div className={clsx(classes.wrapperCenterForButton)}>
     
            </div>
          </Paper>
     
      )}
      {hasRegisterError && <Alert severity="error">{t(confirmMsg)}</Alert>}

      {isRegisterLoading && <Alert severity="info">{t(confirmMsg)}</Alert>}

      {isRegisterLoading && (<CircularProgress />)}

    </div>
  );
};

export default RegisterConfirmStart;
