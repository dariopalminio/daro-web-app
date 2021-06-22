import React, { FunctionComponent, useState } from "react";
import IUserValidator from '../../../state/helper/IUserValidator';
import { UserValidatorFactory } from "../../../origin/helper/UserValidatorFactory";
import { ContactType } from "../../../state/model/notification/ContactType";
import useNotification from "../../../state/hook/useNotification";
import AlertError from "../user/AlertError";

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
      {!sending && (
        <form
          id="ContactForm"
          data-testid="ContactForm"
          action="#"
          onSubmit={handleSendSubmit}
        >
          <Paper className={clsx(classes.paperLoginForm)}>
            Drop us a line:
            <TextField
              id="standard-basic-1"
              className={clsx(classes.textfieldCustom)}
              label="Full Name"
              placeholder=""
              onChange={(e) => handleNameChange(e.target.value)}
              value={contact.name}
              {...(false && { error: true, helperText: "Requerido" })}
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
                Send
              </Button>
            </div>
          </Paper>
        </form>
      )}
      ;
      {sending && (
        <div className="box">
          <strong>Sending email...</strong>
          <CircularProgress />
        </div>
      )}
      {hasError && <AlertError msg={msg} />}
      {wasSent && <Alert severity="success">Message sent!</Alert>}
    </div>
  );
};

export default Contact;
