import React, { useState, useContext } from "react";
import { FunctionComponent } from "react";
import {
  confirmPassIsValid,
  EmailValidation,
  PasswordValidation,
} from "../../helpers/userValidations";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * + *": {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    papperRegisterForm: {
      width: "400px",
      height: "480px",
      margin: "0 auto 0 auto",
      padding: "0px 0px 0px 0px",
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
    buttonCustom:{
      margin: "0 auto auto auto",
    },
  })
);

/**
 * UserRegister Function Component
 *
 * @visibleName UserRegister View
 */
export const UserRegister: FunctionComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailErrorText] = useState('Email inválido');
  const [passValid, setPassValid] = useState(true);
  const [passErrorText] = useState('Invalid Password');
  const [confirmPassValid, setConfirmPassValid] = useState(true);
  const [confirmPassErrorText] = useState('Pasword does not match!');
  const classes = useStyles();

  /**
   * Register
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleEmailChange = async (emailValue: string) => {
    setEmail(emailValue);
    setEmailValid(
      await EmailValidation.isValid({
        email: emailValue,
      })
    );
  };

  const handlePasswordChange = async (passOne: string) => {
    setPassword(passOne);
    setPassValid(
      await PasswordValidation.isValid({
        password: passOne,
      })
    );
  };

  const handleConfirmPassChange = (passTwo: string): void => {
    setConfirmPassword(passTwo);
    const passOne = password;
    setConfirmPassValid(confirmPassIsValid(passOne, passTwo));
  };

  const handleFirstNameChange = (firstNameValue: string): void => {
    setFirstName(firstNameValue);
  };

  const handleLastNameChange = (lastNameValue: string): void => {
    setLastName(lastNameValue);
  };

  return (
    <div>
      <form
        id="RegisterForm"
        data-testid="RegisterForm"
        action="#"
        onSubmit={handleLoginSubmit}
      >
        <Paper className={clsx(classes.papperRegisterForm)}>
          <div className={clsx(classes.wrapperCenter)}>
            <h1 className={clsx(classes.h1Custom)}>Register</h1>
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-1"
              className={clsx(classes.textfieldCustom)}
              label="First Name"
              placeholder=""
              onChange={(e) => handleFirstNameChange(e.target.value)}
              value={firstName}
              {...(false && { error: true, helperText: "Requerido" })}
            />
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-2"
              className={clsx(classes.textfieldCustom)}
              label="First Name"
              placeholder=""
              onChange={(e) => handleLastNameChange(e.target.value)}
              value={lastName}
              {...(false && { error: true, helperText: "Requerido" })}
            />
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-3"
              className={clsx(classes.textfieldCustom)}
              label="Email"
              placeholder="daro@email.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              value={email}
              {...(!emailValid && {
                error: true,
                helperText: emailErrorText,
              })}
            />
          </div>

          <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
            <label className={clsx(classes.labelForPass)}>
              Enter a minimum of 10 characters
              with numbers and letters.
            </label>
          </div>

          <div className={clsx(classes.wrapperCenter)}>
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
          </div>
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
          <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
            <Button className={clsx(classes.buttonCustom)}
            variant="contained" color="primary" type="submit">
              Register
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default UserRegister;
