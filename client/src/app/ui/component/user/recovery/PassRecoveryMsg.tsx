import React, { FunctionComponent, useState } from "react";
import IUserValidator from "../../../../../domain/helper/user.validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user.validator.factory";
import clsx from "clsx";
import emailSentImage from "../../../image/email_sent.png";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
 * PassRecoveryCallToActionMsg
 *
 * @visibleName PassRecoveryCallToActionMsg
 */
const PassRecoveryMsg: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorText] = useState("Email inválido");
  const classes = useStyles();
  const validator: IUserValidator = UserValidatorFactory.create();

  /**
   * Submit
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO
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


          <Paper className={clsx(classes.paperLoginForm)}>
            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>Thank you!</h1>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
            We've sent password reset instructions to your email address. 
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <img src={String(emailSentImage)} alt="emailSentImage" style={{width:"45%", height:"45%"}}/>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
            If no email is received within ten minutes, check that the submitted address is correct.
            </div>


          </Paper>


      <br />


    </div>
  );
};

export default PassRecoveryMsg;
