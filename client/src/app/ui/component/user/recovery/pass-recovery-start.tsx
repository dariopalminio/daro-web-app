import React, { FunctionComponent, useState } from "react";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import clsx from "clsx";
import emailToSendImage from "../../../image/email_to_send.png";
import useRecovery from "../../../../../domain/hook/user/recovery.hook";
import { Redirect } from "react-router";
import { useTranslation } from 'react-i18next';
import button_background from "../../../style/buttonbackground";

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
      background: button_background
    },
  })
);

/**
 * Pass Recovery Email
 *
 * @visibleName PassRecoverySendEmail
 */
const PassRecoveryStart: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorText] = useState("Invalid Email");
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();
  const { isProcessing, isSuccess, hasError, msg, sendEmailToRecovery } = useRecovery();
  const { t, i18n } = useTranslation();


  /**
   * Submit
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmailToRecovery(email, i18n.language);
  };

  /**
   * Validate if the email is in the correct format
   * @param emailValue
   */
  const handleEmailChange = async (emailValue: string) => {
    setEmail(emailValue);

    if (!(await validator.emailIsValid(emailValue))) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }
  };

  return (
    <div>
      {isSuccess && <Redirect to="/user/recovery/msg" />}

      <form
        id="SendEmailForm"
        data-testid="SendEmailForm"
        action="#"
        onSubmit={handleSubmit}
      >
        <Paper className={clsx(classes.paperLoginForm)}>
          <div className={clsx(classes.wrapperCenter)}>
            <h1 className={clsx(classes.h1Custom)}>
              {t('recovery.start.title')}
            </h1>
          </div>

          <div className={clsx(classes.wrapperCenter)}>
          {t('recovery.start.info.enter.email')}
          </div>

          <div className={clsx(classes.wrapperCenter)}>
            <img
              src={String(emailToSendImage)}
              alt="emailSentImage"
              style={{ width: "45%", height: "45%" }}
            />
          </div>

          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic"
              className="textfield-custom"
              label={t('profile.label.email')}
              placeholder="your@email.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              value={email}
              {...(emailIsInvalid && {
                error: true,
                helperText: emailErrorText,
              })}
            />
          </div>

          <div className={clsx(classes.wrapperCenterForButton)}>
            <Button 
            className={clsx(classes.buttonCustom)}
            variant="contained" color="primary" type="submit">
            {t('recovery.start.command.send')}
            </Button>
          </div>
        </Paper>
      </form>

      {isProcessing && <Alert severity="info">{t(msg)}</Alert>}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}
      
      <br />
    </div>
  );
};

export default PassRecoveryStart;
