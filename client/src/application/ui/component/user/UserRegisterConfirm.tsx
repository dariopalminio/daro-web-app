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
    validateVerificationCode,
    startConfirmEmail,
    endConfirmEmail,
  } = useRegisterConfirm();

  const classes = useStyles();


  /**
   * End Confirm Email process
   */
  const handleEndConfirmEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("codeEntered:", codeEntered);
    console.log("masterCode:", masterCode);
    if (validateVerificationCode(codeEntered, masterCode)) {
      endConfirmEmail();
    }
  };

  /**
   * Set code entered
   */
  const handleCodeEntered = async (code: string) => {
    setCodeEntered(code);
  };

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
      {wasConfirmedOk && (
        <Alert severity="success">
          Your account has been confirmed successfully. Now you must go to
          login.
        </Alert>
      )}
      {!session?.email_verified && (
        <form
          id="LoginForm"
          data-testid="LoginForm"
          action="#"
          onSubmit={handleEndConfirmEmailSubmit}
        >
          <Paper className={clsx(classes.paperLoginForm)}>
            <Alert severity="success">
              Your account has been temporarily created successfully. Now you
              must verify your mail.
            </Alert>

            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>Code verification</h1>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <Button
                className={clsx(classes.buttonCustom)}
                variant="contained"
                color="primary"
                onClick={() => handleSendEmail()}
              >
                Send code to your email
              </Button>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              Enter the code that we send you to your email:
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic"
                className="textfield-custom"
                label="Code"
                placeholder="12345"
                onChange={(e) => handleCodeEntered(e.target.value)}
                value={codeEntered}
              />
            </div>

            <div className={clsx(classes.wrapperCenterForButton)}>
              <Button
                className={clsx(classes.buttonCustom)}
                variant="contained"
                color="primary"
                type="submit"
              >
                Verify
              </Button>
            </div>
          </Paper>
        </form>
      )}
      {hasRegisterError && <Alert severity="error">{msg}</Alert>}

      {isRegisterLoading && <Alert severity="info">{msg}</Alert>}
    </div>
  );
};

export default UserRegisterConfirm;
