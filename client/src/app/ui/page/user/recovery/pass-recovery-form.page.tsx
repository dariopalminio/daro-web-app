import {
  RouteComponentProps,
} from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useRecovery from "../../../../../domain/hook/auth/recovery.hook";
import Alert from "../../../common/alert/alert";
import PassRecoveryForm from "../../../component/user/recovery/pass-recovery-form";

type TParams = { token: string }; //match.params.token

const passwordsInitialized = {
  password: '',
  confirmPassword: ''
};

/**
 * PassRecoveryFormPage
 * 
 * Pattern: Container Component, Conditional Rendering and Custom Hooks
 */
export function PassRecoveryFormPage({ match, }: RouteComponentProps<TParams>) {
  const [passwords, setPasswords] = useState(passwordsInitialized);
  const { isProcessing, isSuccess, hasError, msg, updatePassword } = useRecovery();
  const { t, i18n } = useTranslation();
  const expressions = {
    password: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{10,}$/gs
  };
  const errorText = {
    password: t('register.password.invalid'),
    confirmPasswoed: t('register.password.not.match')
  };

  /**
   * Submit update password
   */
  const handleSubmit = async () => {
    updatePassword(match.params.token, passwords.password, i18n.language);
  };

  return (
    <div className="page_container">

      {isSuccess && (
        <Alert severity="success">{t("recovery.updated.successful")}</Alert>
      )}
      {!isSuccess && (
        <PassRecoveryForm
          passwords={passwords}
          regExpressions={expressions}
          validationErrorMessages={errorText}
          onChange={(passwordsUpdated: any) => setPasswords(passwordsUpdated)}
          onSubmit={handleSubmit}
        />
      )}
      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      {isProcessing && <Alert severity="info">{t(msg)}</Alert>}

    </div>
  );
};