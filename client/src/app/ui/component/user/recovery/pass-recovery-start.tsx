import React, { FunctionComponent, useState } from "react";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import clsx from "clsx";
import emailToSendImage from "../../../image/email_to_send.png";
import useRecovery from "../../../../../domain/hook/auth/recovery.hook";
import { Redirect } from "react-router";
import { useTranslation } from 'react-i18next';
import Button from "../../../common/button/button";
import Paper from "../../../common/paper/paper";
import TextField from "../../../common/text-field/text-field";
import Alert from "../../../common/alert/alert";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";


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
    paragraph: {
      fontSize: "1em",
      color: "#525252",
      paddingLeft: "1rem",
    },
    buttonCustom: {
      margin: "0 auto auto auto",
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
        <Paper>
          <div className={clsx(classes.wrapperCenter)}>
            <h1 className={clsx(classes.h1Custom)}>
              {t('recovery.start.title')}
            </h1>
          </div>

          <div className={clsx(classes.wrapperCenter)}>
          <p className={clsx(classes.paragraph)}>
          {t('recovery.start.info.enter.email')}
          </p>
          </div>

          <div className={clsx(classes.wrapperCenter)}>
            <img
              src={String(emailToSendImage)}
              alt="emailSentImage"
              style={{ width: "30%", height: "30%" }}
            />
          </div>

          <div className={clsx(classes.wrapperCenter)}>
            <TextField
              id="standard-basic"
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
            <Button type="submit">
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
