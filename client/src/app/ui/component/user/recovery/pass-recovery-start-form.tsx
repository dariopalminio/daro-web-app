import React, { useState } from "react";
import emailToSendImage from "app/ui/image/email_to_send.png";
import { useTranslation } from 'react-i18next';
import Button from "app/ui/common/button/button";
import Paper from "app/ui/common/paper/paper";
import TextField from "app/ui/common/text-field/text-field";
import { CenteringContainer } from "app/ui/common/elements/centering-container";

const validationFlagInit = {
  email: true
};

interface Props {
  email: string;
  title: string;
  message: string;
  validationErrorMessages?: any;
  onChange: (emailValue: string) => void;
  onSubmit: () => void;
  style?: any;
}

/**
 * Pass Recovery Email
 *
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const PassRecoveryStartForm: React.FC<Props> = ({ email, title, message, validationErrorMessages, onChange, onSubmit, style }) => {

  const { t, i18n } = useTranslation();
  const [validationFlag, setValidationFlag] = useState(validationFlagInit);
  const expressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };
  const errorText = validationErrorMessages ? validationErrorMessages : {
    email: 'Value is invalid'
  };

  /**
   * Submit
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (expressions.email.test(email)) onSubmit();
    else console.log("Cannot submit! Email is invalid to submit.");
  };

  /**
   * Validate if the email is in the correct format
   * @param emailValue
   */
  const handleEmailChange = async (emailValue: string) => {
    onChange(emailValue);

    setValidationFlag({
      ...validationFlag,
      email: expressions.email.test(emailValue)
    });
  };

  return (
    <div>
      <form
        id="SendEmailForm"
        data-testid="SendEmailForm"
        action="#"
        onSubmit={handleSubmit}
      >
        <Paper style={style ? style : {}}>
          <CenteringContainer>
            <h1>{title}</h1>
          </CenteringContainer>

          <CenteringContainer>
            <p>{message}</p>
          </CenteringContainer>

          <CenteringContainer>
            <img
              src={String(emailToSendImage)}
              alt="emailSentImage"
              style={{ width: "30%", height: "30%" }}
            />
           </CenteringContainer>

          <div>
            <TextField
              id="standard-basic"
              label={t('profile.label.email')}
              placeholder="your@email.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              value={email}
              {...(!validationFlag.email && {
                error: true,
                helperText: errorText.email,
              })}
            />
          </div>

          <br />

          <CenteringContainer>
            <Button type="submit">
              {t('recovery.start.command.send')}
            </Button>
            </CenteringContainer>
        </Paper>
      </form>
    </div>
  );
};

export default PassRecoveryStartForm;
