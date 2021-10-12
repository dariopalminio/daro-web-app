import React, { useState, useContext } from "react";
import { FunctionComponent } from "react";
import IUserValidator from '../../../../../domain/helper/user-validator.interface';
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import clsx from "clsx";
import { Redirect } from 'react-router';

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    papperRegisterForm: {
      width: "400px",
      height: "370px",
      margin: "0 auto 0 auto",
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    wrapperCenter: {
      display: "flex",
      justifyContent: "center",
    },
    wrapperCenterWithPaddingTop: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "20px",
    },
    labelForPass: {
      color: "#888888",
      width: "250px",
    },
    textfieldCustom: {
      width: "250px",
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

type TParams = { token: string };

/**
 * Pass Recovery Form
 *
 * @visibleName PassRecoveryForm
 */
 function PassRecoveryForm({ token }: TParams) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailErrorText] = useState("Email inválido");
  const [passValid, setPassValid] = useState(true);
  const [passErrorText] = useState("Invalid Password");
  const [confirmPassValid, setConfirmPassValid] = useState(true);
  const [confirmPassErrorText] = useState("Pasword does not match!");
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();

  //content text
  const success_pass_recovery_sucess = "Success! Your password has been changed.";
  const error_pass_recovery_time_expired = "Something went wrong! It looks like you clicked on an invalid password reset link. Please try again.";
  const info_password_pattern = "Enter a minimum of 10 characters with numbers and letters.";
  const command_change = "Change";
  const title_register = "Change your password";

  /**
   * 
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO
    //Redirect to Verify
  };


  const handlePasswordChange = async (passOne: string) => {
    setPassword(passOne);
    setPassValid(
      await validator.passIsValid(passOne)
    );
  };

  const handleConfirmPassChange = (passTwo: string): void => {
    setConfirmPassword(passTwo);
    const passOne = password;
    setConfirmPassValid(validator.confirmPassIsValid(passOne, passTwo));
  };

  return (
    <div>

        <form
          id="RegisterForm"
          data-testid="RegisterForm"
          action="#"
          onSubmit={handleSubmit}
        >
          <Paper className={clsx(classes.papperRegisterForm)}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <div className={clsx(classes.wrapperCenter)}>
                  <h1 className={clsx(classes.h1Custom)}>{title_register}</h1>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className={clsx(classes.wrapperCenter)}>
                  <label className={clsx(classes.labelForPass)}>
                    {info_password_pattern}
                  </label>
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-basic-4"
                  className={clsx(classes.textfieldCustom)}
                  label="Password"
                  type="password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  value={password}
                  {...(!passValid && {
                    error: true,
                    helperText: passErrorText,
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <div className={clsx(classes.wrapperCenter)}>
                  <TextField
                    id="standard-basic-5"
                    className={clsx(classes.textfieldCustom)}
                    label="Confirm Password"
                    type="password"
                    onChange={(e) => handleConfirmPassChange(e.target.value)}
                    value={confirmPassword}
                    {...(!confirmPassValid && {
                      error: true,
                      helperText: confirmPassErrorText,
                    })}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
                  <Button
                    className={clsx(classes.buttonCustom)}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {command_change}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </form>
   
    </div>
  );
};

export default PassRecoveryForm;
