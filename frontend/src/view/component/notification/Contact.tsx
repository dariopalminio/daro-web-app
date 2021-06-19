import React, { FunctionComponent, useState } from "react";
import { EmailValidation } from "../../../logic/helper/userValidations";
import { ContactType } from "../../../model/notification/ContactType";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
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
  const [contact, setContact] = useState(defaultContact);

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorText] = useState("Invalid Email");

  const classes = useStyles();

  /**
   * send Submit
   */
  const handleSendSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    if (
      !(await EmailValidation.isValid({
        email: emailValue,
      }))
    ) {
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

  return (
    <div>
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
    </div>
  );
};

export default Contact;
