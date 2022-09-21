import React, { useState } from "react";
import { FunctionComponent } from "react";
import IUserValidator from '../../../../../domain/helper/user-validator.interface';
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import useRegister from "../../../../../domain/hook/auth/register.hook";
import clsx from "clsx";
import { Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';
import Button from "../../../common/button/button";
import Paper from "../../../common/paper/paper";
import TextField from "../../../common/text-field/text-field";
import Alert from "../../../common/alert/alert";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "../../../common/progress/circular-progress";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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

  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameValid, setLastNameValid] = useState(false);
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

  const handleFirstNameChange = async (firstNameValue: string) => {
    setFirstName(firstNameValue);
    setFirstNameValid(await validator.nameIsValid(firstNameValue));

  };

  const handleLastNameChange = async (lastNameValue: string) => {
    setLastName(lastNameValue);
    setLastNameValid(await validator.nameIsValid(lastNameValue));
  };

  return (
    <div>
      {isSuccess && (
        <Redirect to='/user/register/confirm/start' />
      )}

      {!isSuccess && (
        <form
          id="RegisterForm"
          data-testid="RegisterForm"
          action="#"
          onSubmit={handleLoginSubmit}
        >
          <Paper>

            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>
                {t('register.title')}
              </h1>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic-1"
                
                label={t('profile.label.firstname')}
                placeholder=""
                onChange={(e) => handleFirstNameChange(e.target.value)}
                value={firstName}
                {...(!firstNameValid && { error: true, helperText: t('register.info.helper.text.required') })}
              />
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic-2"
               
                label={t('profile.label.lastname')}
                placeholder=""
                onChange={(e) => handleLastNameChange(e.target.value)}
                value={lastName}
                {...(!lastNameValid && {
                  error: true,
                  helperText: t('register.info.helper.text.required'),
                })}
              />
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic-3"
              
                label={t('profile.label.email')}
                placeholder="you@email.com"
                onChange={(e) => handleEmailChange(e.target.value)}
                value={email}
                {...(!emailValid && {
                  error: true,
                  helperText: emailErrorText,
                })}
              />
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <label className={clsx(classes.labelForPass)}>
                {t('register.info.password.pattern')}
              </label>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic-4"
              
                label={t('login.label.password')}
                type="password"
                onChange={(e) => handlePasswordChange(e.target.value)}
                value={password}
                {...(!passValid && {
                  error: true,
                  helperText: passErrorText,
                })}
              />
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic-5"
               
                label={t('register.label.confirm.password')}
                type="password"
                onChange={(e) => handleConfirmPassChange(e.target.value)}
                value={confirmPassword}
                {...(!confirmPassValid && {
                  error: true,
                  helperText: confirmPassErrorText,
                })}
              />
            </div>

            <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
              <Button
                type="submit"
                style={{ margin: "20px 20px 20px 20px" }}
              >
                {t('register.command')}
              </Button>
            </div>

          </Paper>
        </form>
      )}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      {isProcessing && (
          <CircularProgress>{t(msg)}</CircularProgress>
      )}

    </div>
  );
};

export default RegisterForm;
