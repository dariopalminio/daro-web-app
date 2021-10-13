import React, { FunctionComponent, useState } from "react";
import IUserValidator from '../../../../domain/helper/user-validator.interface';
import { UserValidatorFactory } from "../../../../domain/helper/user-validator.factory";
import { ContactType } from "../../../../domain/model/notification/contact.type";
import useNotification from "../../../../domain/hook/notification.hook";
import AlertError from "../user/alert-error";
import { useTranslation } from 'react-i18next';

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperLoginForm: {
      width: "300px",
      margin: "0 auto 0 auto",
      padding: "0px 0px 0px 0px",
    },
    textfieldCustom: {
      width: "290px",
    },
    multilineCustom: {
      width: "290px",
    },
    buttonCustom: {
      margin: "0 auto auto auto",
    },
    h1Custom: {
      fontSize: "1.5em",
      color: "#525252",
      paddingLeft: "1rem",
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
  })
);

const defaultContact: ContactType = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

/**
 * Contact
 *
 * @visibleName Contact View
 */
const Contact: FunctionComponent = () => {
  const { sending, hasError, msg, wasSent, sendContactEmail } =
    useNotification();
  const [contact, setContact] = useState(defaultContact);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorText] = useState("Invalid Email");
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();
  const { t, i18n } = useTranslation();


  /**
   * send Submit
   */
  const handleSendSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(contact);
  };

  const handleNameChange = (firstNameValue: string): void => {
    setContact((prevState) => ({
      ...prevState,
      name: firstNameValue,
    }));
  };

  /**
   * Validate if the email is in the correct format
   * @param emailValue
   */
  const handleEmailChange = async (emailValue: string) => {
    setContact((prevState) => ({
      ...prevState,
      email: emailValue,
    }));

    if (!(await validator.emailIsValid(emailValue))) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }
  };

  const handlePhoneChange = async (phoneValue: string) => {
    setContact((prevState) => ({
      ...prevState,
      phone: phoneValue,
    }));
  };

  const handleMessageChange = async (textValue: string) => {
    setContact((prevState) => ({
      ...prevState,
      message: textValue,
    }));
  };

  return (
    <div>
      {(!sending && !wasSent)  && (
        <form
          id="ContactForm"
          data-testid="ContactForm"
          action="#"
          onSubmit={handleSendSubmit}
        >
          <Paper className={clsx(classes.paperLoginForm)}>

          <div className={clsx(classes.wrapperCenter)}>
                  <h1 className={clsx(classes.h1Custom)}>
                  {t('contact.title')}
                  </h1>
                </div>
                
            {t('contact.info.call.t.action')}

            <TextField
              id="standard-basic-1"
              className={clsx(classes.textfieldCustom)}
              label="Full Name"
              placeholder=""
              onChange={(e) => handleNameChange(e.target.value)}
              value={contact.name}
              {...(false && { error: true, helperText: t('register.info.helper.text.required') })}
            />
            <TextField
              id="standard-basic"
              className={clsx(classes.textfieldCustom)}
              label="Email"
              placeholder="daro@email.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              value={contact.email}
              {...(emailIsInvalid && {
                error: true,
                helperText: emailErrorText,
              })}
            />
            <TextField
              id="standard-basic"
              className={clsx(classes.textfieldCustom)}
              label="Phone"
              placeholder="0000000000"
              onChange={(e) => handlePhoneChange(e.target.value)}
              value={contact.phone}
            />
            <TextField
              id="outlined-textarea"
              className={clsx(classes.multilineCustom)}
              label="Message"
              placeholder="Placeholder"
              onChange={(e) => handleMessageChange(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
            />
            <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
              <Button
                className={clsx(classes.buttonCustom)}
                variant="contained"
                color="primary"
                type="submit"
              >
                {t('contact.command.send')}
              </Button>
            </div>
          </Paper>
        </form>
      )}
      
      {sending && (
        <div className="box">
          <strong>
            {t('contact.info.sending.email')}
          </strong>
          <CircularProgress />
        </div>
      )}
      
      {hasError && <AlertError msg={t(msg)} />}
      {wasSent && <Alert severity="success">{t('contact.success.sent.email')}</Alert>}
    </div>
  );
};

export default Contact;
