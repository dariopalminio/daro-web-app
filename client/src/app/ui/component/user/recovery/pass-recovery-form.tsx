import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "app/ui/common/button/button";
import Paper from "app/ui/common/paper/paper";
import TextField from "app/ui/common/text-field/text-field";

const validationFlagInit = {
  password: true
};

interface Props {
  passwords: any;
  regExpressions?: any;
  validationErrorMessages?: any;
  onChange: (passwordsUpdated: any) => void;
  onSubmit: () => void;
  style?: any;
}

/**
 * Pass Recovery Form
 *
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const PassRecoveryForm: React.FC<Props> = ({ passwords, regExpressions, validationErrorMessages, onChange, onSubmit, style }) => {
  const { t } = useTranslation();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationFlag, setValidationFlag] = useState(validationFlagInit);
  const expressions = regExpressions ? regExpressions : {
    password: /^.{4,12}$/ // 4 a 12 digitos.
  };
  const [confirmPassValid, setConfirmPassValid] = useState(true); //second password

  const errorText = validationErrorMessages ? validationErrorMessages : {
    password: 'Value is invalid',
    confirmPassword: 'Value is invalid',
  };

  const handlePasswordChange = async (passOne: string) => {
    const passwordsUpdated = {
      ...passwords,
      password: passOne
    };
    onChange(passwordsUpdated);

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

  const handleConfirmPassChange = async (passTwo: string) => {
    setConfirmPassword(passTwo)
    const passOne = passwords.password;
    setConfirmPassValid(confirmPassIsValid(passOne, passTwo));
  };

  const fieldsAreValid = () => {
    return ( expressions.password.test(passwords.password) &&
      confirmPassValid)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldsAreValid()) onSubmit(); //Parent execute the submit
      else console.log("Cannot submit password change request form because any field is invalid.");
  };

  return (
    <div>
      <form
        id="RegisterForm"
        data-testid="RegisterForm"
        action="#"
        onSubmit={handleSubmit}
      >
        <Paper>

          <div>
            <h1>
              {t("recovery.form.title")}
            </h1>
          </div>

          <div >
            <label>
              {t("register.info.password.pattern")}
            </label>
          </div>

          <TextField
            id="standard-basic-4"
            label="Password"
            type="password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={passwords.password}
            {...(!validationFlag.password && {
              error: true,
              helperText: errorText.password,
            })}
          />

          <div>
            <TextField
              id="standard-basic-5"
              label="Confirm Password"
              type="password"
              onChange={(e) => handleConfirmPassChange(e.target.value)}
              value={confirmPassword}
              {...(!passwords.confirmPassValid && {
                error: true,
                helperText: errorText.confirmPassword,
              })}
            />
          </div>

          <br/>

          <div>
            <Button
              type="submit"
            >
              {t("recovery.form.command.change")}
            </Button>
          </div>

        </Paper>
      </form>
    </div>
  );
};

export default PassRecoveryForm;
