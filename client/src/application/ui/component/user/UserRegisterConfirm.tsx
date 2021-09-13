import React, { FunctionComponent, useState, useContext } from "react";
import useLogin from "../../../../domain/hook/login.hook";
import IUserValidator from '../../../../domain/helper/user.validator.interface';
import { UserValidatorFactory } from "../../../../domain/helper/user.validator.factory";
import AlertError from "./AlertError";
import clsx from "clsx";
import SessionContext, { ISessionContext } from "../../../../domain/context/session.context";
import useRegisterConfirm from "../../../../domain/hook/register.confirm.hook";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  const [code, setCode] = useState("");
  const { session } = useContext(SessionContext) as ISessionContext;
  const { wasConfirmedOk, isRegisterLoading, hasRegisterError, msg, confirmEmail } =
  useRegisterConfirm();

  const classes = useStyles();


  /**
   * Verify
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleLoginSubmit clicked!");
    confirmEmail();
  };


  return (
    <div>
      {wasConfirmedOk && (
                  <Alert severity="success">
                  Your account has been confirmed successfully. 
                  Now you must go to login.
                  </Alert>
      )}
{!session?.email_verified && (
        <form
          id="LoginForm"
          data-testid="LoginForm"
          action="#"
          onSubmit={handleLoginSubmit}
        >
          <Paper className={clsx(classes.paperLoginForm)}>

          <Alert severity="success">
          Your account has been created successfully. 
          Now you must verify your mail.
          </Alert>

            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>Code Form</h1>
            </div>
            <div className={clsx(classes.wrapperCenter)}>

              <TextField
                id="standard-basic"
                className="textfield-custom"
                label="Code"
                placeholder="12345"
                value={code}
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
