import React, { FunctionComponent, useState } from "react";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import clsx from "clsx";
import emailToSendImage from "../../../image/email_to_send.png";
import useRecoveryStart from "../../../../../domain/hook/user/recovery-start.hook";
import { Redirect } from "react-router";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

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
  })
);

/**
 * Pass Recovery Email
 *
 * @visibleName PassRecoverySendEmail
 */
const PassRecoveryStart: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorText] = useState("Email inválido");
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();
  const { sending, sent, error, msg, sendEmailToRecovery } = useRecoveryStart();

  //content text
  const info_recovery_enter_email = "Do not worry! Just enter the email address with which you have registered and you will receive an email where we will indicate the steps to follow.";
  const command_send_recovery_pass = "Send recovery password";
  const title_pass_recovery = "Password Recovery";


  /**
   * Submit
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmailToRecovery(email);
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
      {sent && <Redirect to="/user/recovery/msg" />}

      <form
        id="SendEmailForm"
        data-testid="SendEmailForm"
        action="#"
        onSubmit={handleSubmit}
      >
        <Paper className={clsx(classes.paperLoginForm)}>
          <div className={clsx(classes.wrapperCenter)}>
            <h1 className={clsx(classes.h1Custom)}>
              {title_pass_recovery}
            </h1>
          </div>

          <div className={clsx(classes.wrapperCenter)}>
            {info_recovery_enter_email}
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
              label="Email"
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
            <Button variant="contained" color="primary" type="submit">
              {command_send_recovery_pass}
            </Button>
          </div>
        </Paper>
      </form>

      <br />
    </div>
  );
};

export default PassRecoveryStart;
