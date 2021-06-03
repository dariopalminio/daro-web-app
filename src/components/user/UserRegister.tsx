import React, { useState, useContext } from "react";
import { FunctionComponent } from "react";
import { emailIsValid } from "../../helpers/userValidations";
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
      height: "420px",
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
  const [emailNotValid, setEmailNotValid] = useState(false);
  const classes = useStyles();

  /**
   * Register
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleEmailChange = (emailValue: string): void => {
    setEmail(emailValue);

    if (!emailIsValid(emailValue)) {
      setEmailNotValid(true);
    } else {
      setEmailNotValid(false);
    }
  };

  const handlePasswordChange = (passOne: string): void => {
    setPassword(passOne);
  };

  const handleConfirmPassChange = (passTwo: string): void => {
    setConfirmPassword(passTwo);
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
            <h1>Register</h1>
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-1"
              className="textfield-custom"
              label="First Name"
              placeholder=""
              onChange={(e) => handleFirstNameChange(e.target.value)}
              value={firstName}
              {...(false && { error: true, helperText: "Email inválido" })}
            />
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-2"
              className="textfield-custom"
              label="First Name"
              placeholder=""
              onChange={(e) => handleLastNameChange(e.target.value)}
              value={lastName}
              {...(false && { error: true, helperText: "Email inválido" })}
            />
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-3"
              className="textfield-custom"
              label="Email"
              placeholder="daro@email.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              value={email}
              {...(emailNotValid && {
                error: true,
                helperText: "Email inválido",
              })}
            />
          </div>
          <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
            <label className={clsx(classes.labelForPass)}>
              Enter a minimum of 10 characters
            </label>
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-4"
              className="textfield-custom"
              label="Password"
              type="password"
              onChange={(e) => handlePasswordChange(e.target.value)}
              value={password}
            />
          </div>
          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic-5"
              className="textfield-custom"
              label="Confirm Password"
              type="password"
              onChange={(e) => handleConfirmPassChange(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default UserRegister;
