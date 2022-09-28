import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from "../../../common/button/button";
import { CenteringContainer } from "../../../common/elements/centering-container";
import Paper from "../../../common/paper/paper";
import TextField from "../../../common/text-field/text-field";

const validationFlagInit = {
  userName: true,
  firstName: true,
  lastName: true,
  email: true,
  password: true
};


interface Props {
  user: any;
  regExpressions?: any;
  validationErrorMessages?: any;
  onChange: (userUpdated: any) => void;
  onSubmit: () => void;
  style?: any;
}

/**
 * UserRegister Function Component
 *
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const RegisterForm: React.FC<Props> = ({ user, regExpressions, validationErrorMessages, onChange, onSubmit, style }) => {

  const { t } = useTranslation();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationFlag, setValidationFlag] = useState(validationFlagInit);
  const expressions = regExpressions ? regExpressions : {
    firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
  };
  const [confirmPassValid, setConfirmPassValid] = useState(true); //second password

  const errorText = validationErrorMessages ? validationErrorMessages : {
    firstName: 'Value is invalid',
    lastName: 'Value is invalid',
    email: 'Value is invalid',
    password: 'Value is invalid',
    confirmPass: 'Value is invalid',
  };

  /**
   * Register
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldsAreValid()) onSubmit(); //Parent execute the submit
    else console.log("Cannot submit register form because any field is invalid.");
  };

  const handleFirstNameChange = (firstNameValue: string) => {

    onChange({
      ...user,
      firstName: firstNameValue
    });

    setValidationFlag({
      ...validationFlag,
      firstName: expressions.firstName.test(firstNameValue)
    });
  };

  const handleLastNameChange = async (lastNameValue: string) => {
    onChange({
      ...user,
      lastName: lastNameValue
    });

    setValidationFlag({
      ...validationFlag,
      lastName: expressions.lastName.test(lastNameValue)
    });
  };

  const handleEmailChange = async (emailValue: string) => {
    onChange({
      ...user,
      email: emailValue
    });
    setValidationFlag({
      ...validationFlag,
      email: expressions.email.test(emailValue)
    });
  };

  const handlePasswordChange = async (passOne: string) => {
    onChange({
      ...user,
      password: passOne
    });
    setValidationFlag({
      ...validationFlag,
      password: expressions.password.test(passOne)
    });
  };

  const confirmPassIsValid = (pasOne: string, passTwo: string): boolean => {
    if (pasOne !== passTwo) {
      return false
    } else {
      return true
    }
  };

  const handleConfirmPassChange = (passTwo: string): void => {
    setConfirmPassword(passTwo);
    const passOne = user.password;
    setConfirmPassValid(confirmPassIsValid(passOne, passTwo));
  };

  const fieldsAreValid = () => {
    return (
      expressions.firstName.test(user.firstName) &&
      expressions.lastName.test(user.lastName) &&
      expressions.email.test(user.email) &&
      expressions.password.test(user.password) &&
      confirmPassValid)
  };

  return (
    <form
      id="RegisterForm"
      data-testid="RegisterForm"
      action="#"
      onSubmit={handleSubmit}
    >
      <Paper style={style ? style : {}}>

        <CenteringContainer><h1>
          {t('register.title')}
        </h1></CenteringContainer>

        <TextField
          id="standard-basic-1"

          label={t('profile.label.firstname')}
          placeholder=""
          onChange={(e) => handleFirstNameChange(e.target.value)}
          value={user.firstName}
          {...(!validationFlag.firstName && { error: true, helperText: errorText.firstName })}
        />

        <TextField
          id="standard-basic-2"

          label={t('profile.label.lastname')}
          placeholder=""
          onChange={(e) => handleLastNameChange(e.target.value)}
          value={user.lastName}
          {...(!validationFlag.lastName && {
            error: true,
            helperText: errorText.lastName,
          })}
        />

        <TextField
          id="standard-basic-3"

          label={t('profile.label.email')}
          placeholder="you@email.com"
          onChange={(e) => handleEmailChange(e.target.value)}
          value={user.email}
          {...(!validationFlag.email && {
            error: true,
            helperText: errorText.email,
          })}
        />

        <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center", display: "block" }}>
          <label >
            {t('register.info.password.pattern')}
          </label>
        </div>

        <TextField
          id="standard-basic-4"

          label={t('login.label.password')}
          type="password"
          onChange={(e) => handlePasswordChange(e.target.value)}
          value={user.password}
          {...(!validationFlag.password && {
            error: true,
            helperText: errorText.password,
          })}
        />

        <TextField
          id="standard-basic-5"

          label={t('register.label.confirm.password')}
          type="password"
          onChange={(e) => handleConfirmPassChange(e.target.value)}
          value={confirmPassword}
          {...(!confirmPassValid && {
            error: true,
            helperText: errorText.confirmPass,
          })}
        />

        <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center", display: "block" }}>

          <br></br>
          <Button
            type="submit"
            style={{ marginTop: "15px" }}
          >
            {t('register.command')}
          </Button>

        </div>
      </Paper>
    </form >
  );
};

export default RegisterForm;
