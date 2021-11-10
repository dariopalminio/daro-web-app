import React, { useState, useContext } from "react";
import { FunctionComponent } from "react";
import IUserValidator from '../../../../../domain/helper/user-validator.interface';
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import useRegister from "../../../../../domain/hook/user/register.hook";
import SessionContext, { ISessionContext } from "../../../../../domain/context/session.context";
import clsx from "clsx";
import { Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';

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
      height: "570px",
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

/**
 * UserRegister Function Component
 *
 * @visibleName UserRegister View
 */
export const RegisterForm: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
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
  const { t } = useTranslation();
  
  const { isProcessing, isSuccess, hasError, msg, register } =
    useRegister();

  /**
   * Register
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register(firstName, lastName, email, password);
    //Redirect to Verify
  };

  const handleEmailChange = async (emailValue: string) => {
    setEmail(emailValue);
    setEmailValid(await validator.emailIsValid(emailValue));
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

  const handleFirstNameChange = (firstNameValue: string): void => {
    setFirstName(firstNameValue);
  };

  const handleLastNameChange = (lastNameValue: string): void => {
    setLastName(lastNameValue);
  };

  return (
    <div>
      {isSuccess && (
        <Redirect to='/user/register/confirm/start'/>
      )}

      {!session?.isRegistered && (
        <form
          id="RegisterForm"
          data-testid="RegisterForm"
          action="#"
          onSubmit={handleLoginSubmit}
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
                  <h1 className={clsx(classes.h1Custom)}>
                  {t('register.title')}
                  </h1>
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-basic-1"
                  className={clsx(classes.textfieldCustom)}
                  label="First Name"
                  placeholder=""
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                  value={firstName}
                  {...(false && { error: true, helperText: t('register.info.helper.text.required') })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-basic-2"
                  className={clsx(classes.textfieldCustom)}
                  label="Last Name"
                  placeholder=""
                  onChange={(e) => handleLastNameChange(e.target.value)}
                  value={lastName}
                  {...(false && { error: true, helperText: t('register.info.helper.text.required') })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-basic-3"
                  className={clsx(classes.textfieldCustom)}
                  label="Email"
                  placeholder="you@email.com"
                  onChange={(e) => handleEmailChange(e.target.value)}
                  value={email}
                  {...(!emailValid && {
                    error: true,
                    helperText: emailErrorText,
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <div className={clsx(classes.wrapperCenter)}>
                  <label className={clsx(classes.labelForPass)}>
                  {t('register.info.password.pattern')}
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
                    {t('register.command')}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      {isProcessing && <Alert severity="info">{t(msg)}</Alert>}
    </div>
  );
};

export default RegisterForm;
