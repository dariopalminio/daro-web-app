import React, { FunctionComponent, useState } from "react";
import IUserValidator from '../../../../domain/helper/user-validator.interface';
import { UserValidatorFactory } from "../../../../domain/helper/user-validator.factory";
import { ContactType } from "../../../../domain/model/notification/contact.type";
import useNotification from "../../../../domain/hook/notification.hook";
import Alert from "../../common/alert/alert";
import { useTranslation } from 'react-i18next';
import CircularProgress from "../../common/progress/circular-progress";
import Button from "../../common/button/button";
import Paper from "../../common/paper/paper";
import TextField from "../../common/text-field/text-field";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
  const [fullnameValid, setFullnameValid] = useState(false);
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();
  const { t } = useTranslation();


  /**
   * send Submit
   */
  const handleSendSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(contact);
  };

  const handleNameChange = async (fullname: string) => {
    setContact((prevState) => ({
      ...prevState,
      name: fullname,
    }));
    setFullnameValid(await validator.nameIsValid(fullname));
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
      {(!sending && !wasSent) && (

        <Paper>
          <form
            id="ContactForm"
            data-testid="ContactForm"
            action="#"
            onSubmit={handleSendSubmit}
          >
            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>
                {t('contact.title')}
              </h1>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
            {t('contact.info.call.to.action')}
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic-1"
                label={t('contact.label.fullname')}
                placeholder=""
                onChange={(e) => handleNameChange(e.target.value)}
                value={contact.name}
                {...(!fullnameValid && { error: true, helperText: t('register.info.helper.text.required') })}
              />
            </div>
            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic"
                label={t('profile.label.email')}
                placeholder="daro@email.com"
                onChange={(e) => handleEmailChange(e.target.value)}
                value={contact.email}
                {...(emailIsInvalid && {
                  error: true,
                  helperText: emailErrorText,
                })}
              />
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="standard-basic"
                label="Phone"
                placeholder="0000000000"
                onChange={(e) => handlePhoneChange(e.target.value)}
                value={contact.phone}
              />
            </div>
            <div className={clsx(classes.wrapperCenter)}>
              <TextField
                id="outlined-textarea"
                label={t('contact.label.message')}
                placeholder="Placeholder"
                onChange={(e) => handleMessageChange(e.target.value)}
                value={contact.message}
                multiline={true}
              />
            </div>

            <div className={clsx(classes.wrapperCenterWithPaddingTop)}>
              <Button
                type="submit"
                style={{ margin: "20px 20px 20px 20px" }}
              >
                {t('contact.command.send')}
              </Button>
            </div>

          </form>
        </Paper>

      )
      }

      {
        sending && (
          <div className="box">
            <strong>
              {t('contact.info.sending.email')}
            </strong>
            <CircularProgress />
          </div>
        )
      }

      {hasError && <Alert severity="error">{t(msg)} </Alert>}
      {wasSent && <Alert severity="success">{t('contact.success.sent.email')}</Alert>}
    </div >
  );
};

export default Contact;
