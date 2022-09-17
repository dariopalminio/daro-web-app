import React, { useState } from "react";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import useRecovery from "../../../../../domain/hook/user/recovery.hook";
import Button from "../../../common/button/button";
import Paper from "../../../common/paper/paper";
import TextField from "../../../common/text-field/text-field";
import Alert from "../../../common/alert/alert";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";


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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passValid, setPassValid] = useState(true);
  const [passErrorText] = useState("Invalid Password");
  const [confirmPassValid, setConfirmPassValid] = useState(true);
  const [confirmPassErrorText] = useState("Pasword does not match!");
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();
  const { isProcessing, isSuccess, hasError, msg, updatePassword } = useRecovery();
  const { t, i18n } = useTranslation();

  /**
   * Submit update password
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPassOneOk = (await validator.passIsValid(password));
    const isPassTwoOk = await validator.confirmPassIsValid(password, confirmPassword);
    if (isPassOneOk && isPassTwoOk) updatePassword(token, password, i18n.language);
  };

  const handlePasswordChange = async (passOne: string) => {
    setPassword(passOne);
    setPassValid(await validator.passIsValid(passOne));
  };

  const handleConfirmPassChange = async (passTwo: string) => {
    setConfirmPassword(passTwo);
    const passOne = password;
    setConfirmPassValid(await validator.confirmPassIsValid(passOne, passTwo));
  };

  return (
    <div>
      {isSuccess && (
        <Alert severity="success">{t("recovery.updated.successful")}</Alert>
      )}
      {!isSuccess && (
        <form
          id="RegisterForm"
          data-testid="RegisterForm"
          action="#"
          onSubmit={handleSubmit}
        >
          <Paper>
              
                <div className={clsx(classes.wrapperCenter)}>
                  <h1 className={clsx(classes.h1Custom)}>
                    {t("recovery.form.title")}
                  </h1>
                </div>
            
                <div className={clsx(classes.wrapperCenter)}>
                  <label className={clsx(classes.labelForPass)}>
                    {t("register.info.password.pattern")}
                  </label>
                </div>
             
                <TextField
                  id="standard-basic-4"
                  label="Password"
                  type="password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  value={password}
                  {...(!passValid && {
                    error: true,
                    helperText: passErrorText,
                  })}
                />
             
                <div className={clsx(classes.wrapperCenter)}>
                  <TextField
                    id="standard-basic-5"
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
                  <Button
                    type="submit"
                  >
                    {t("recovery.form.command.change")}
                  </Button>
                </div>
             
          </Paper>
        </form>
      )}
      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      {isProcessing && <Alert severity="info">{t(msg)}</Alert>}
    </div>
  );
}

export default PassRecoveryForm;
