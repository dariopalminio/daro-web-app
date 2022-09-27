import { FunctionComponent, useState } from "react";
import useRecovery from "../../../../../domain/hook/auth/recovery.hook";
import { Redirect } from "react-router";
import { useTranslation } from 'react-i18next';
import Alert from "../../../common/alert/alert";
import CircularProgress from "../../../common/progress/circular-progress";
import PassRecoveryStartForm from "../../../component/user/recovery/pass-recovery-start-form";



export const PassRecoveryStartPage: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const { isProcessing, isSuccess, hasError, msg, sendEmailToRecovery } = useRecovery();
  const { t, i18n } = useTranslation();

  const errorText = {
    email: t('register.email.invalid')
  };

  /**
  * Submit
  */
  const handleSubmit = () => {
    sendEmailToRecovery(email, i18n.language); //send to server
  };

  return (
    <div className="page_container">

      {isSuccess && <Redirect to="/user/recovery/msg" />}

      <PassRecoveryStartForm
        email={email}
        title={t('recovery.start.title')}
        message={t('recovery.start.info.enter.email')}
        validationErrorMessages={errorText}
        onChange={(emailValue: string) => setEmail(emailValue)}
        onSubmit={() => handleSubmit} 
        style={{width: "300px", margin: "34px auto auto auto"}}
        />

      {isProcessing && <Alert severity="info">{t(msg)}</Alert>}

      {isProcessing && (<CircularProgress />)}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      <br />

    </div>
  );
};
