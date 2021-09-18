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

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

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
    },
  })
);

/**
 * Verify Register Component
 *
 * @visibleName VerifyRegister
 */
const UserRegisterConfirm: FunctionComponent = () => {
  const [codeEntered, setCodeEntered] = useState("");
  const [masterCode, setMasterCode] = useState("");
  const { session } = useContext(SessionContext) as ISessionContext;
  const {
    validVerificationCode,
    validVerificationCodeMsg,
    wasConfirmedOk,
    isRegisterLoading,
    hasRegisterError,
    msg,
    redirect,
    startConfirmEmail,
  } = useRegisterConfirm();

  const classes = useStyles();

  /**
   * send email with verification code
   */
  const handleSendEmail = async () => {
    const userName = session?.given_name ? session?.given_name : "";
    const userEmail = session?.email ? session?.email : "";
    const codeReturned: string = startConfirmEmail(userName, userEmail);
    setMasterCode(codeReturned);
  };

  return (
    <div>
      {redirect && (<Redirect to='/user/auth' />)}

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
      {hasRegisterError && <Alert severity="error">{msg}</Alert>}

      {isRegisterLoading && <Alert severity="info">{msg}</Alert>}
    </div>
  );
};

export default UserRegisterConfirm;
